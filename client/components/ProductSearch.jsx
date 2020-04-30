import React, {Component} from 'react';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// a standalone build of socket.io-client is exposed automatically by the socket.io server
import socketIOClient from "socket.io-client";
import axios from 'axios';

// dev url is only required in development to make requests from client to server
let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3000';
}

// url where socket.io server is listening
const ENDPOINT = DEV_URL ? DEV_URL : '/';
const socket = socketIOClient(ENDPOINT);
console.log("Socket", socket);

// speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.lang = 'en-US';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            product_names: [],
            listening: false,
            outputYou: '',
            outputBot: '',
            infoDisplay: ''
        };
    }

    componentDidMount(){

        // cancel previous request
        if (typeof this._source != typeof undefined) {
          this._source.cancel('Operation canceled due to new request');
        }

        // save the new request for cancellation
        this._source = axios.CancelToken.source();

        axios.get(DEV_URL + '/mapping', {
            // cancel token used by axios
            cancelToken: this._source.token
          })
          .then(data => {
              // console.log('Got data from Express server!', data.data);
              const productNames = data.data.map(element => element.name);
              this.setState({
                  products: data.data,
                  product_names: productNames
              })
        }
          )
          .catch(error => {
            if(axios.isCancel(error)){
              console.log('Request is canceled', error);
            } else {
              console.log(error);
            }
          });

        const component = this;
        // listening for search result from the server
        socket.on('response', (response) => {
          console.log('Socket response', response);
          component.synthVoice(response.reply);

          if(response.reply == '') response.reply = '(No answer...)';

          component.setState({
              listening: false,
              outputBot: response.reply,
              infoDisplay: response.location
          })

          if (response.type === 'where') {
            const includes = component.props.groceryList.map(element => element.name).includes(response.name);
            if (!includes) {
              component.props.addItemToGroceryList({ name: response.name, location: response.info });
            }
            this.props.setProductLocation(response.reply)
            this.props.navigateToSearchResults();
          }

        });
    }

    // Invoked right before React unmounts and destroys the component
    componentWillUnmount() {
      socket.off();
      if (this._source) {
          this._source.cancel('Operation canceled due to component unmounting');
      }
    }

    // turn speech recognition on and off
    toggleListen = () => {
      this.setState({
        listening: !this.state.listening
      }, this.handleListen)
    }

    // handle all of the speech recognition logic
    handleListen = () => {
      console.log('Listening?', this.state.listening);

      if (this.state.listening) {
          recognition.start();
          // recognition.onend = () => {
          //   console.log("Continue listening...");
          //   recognition.start();
          // }
      } else {
          recognition.stop();
          recognition.onend = () => {
            console.log("Stopped listening per click");
          }
      }

      recognition.onstart = () => {
        console.log("Listening!");
      }

      recognition.onspeechstart = () => {
        console.log('Speech has been detected.');
        this.setState({
          outputYou: '',
          outputBot: '',
          infoDisplay: ''
        });
      }

      recognition.onresult = (e) => {
        console.log('Result has been detected.', e);

        const last = e.results.length - 1;
        const text = e.results[last][0].transcript;

        console.log("Text", text)

        this.setState({
          outputYou: text
        })

        console.log('Confidence: ' + e.results[0][0].confidence);

        socket.emit('customer query', text);
      }

      recognition.onspeechend = () => {
        console.log('Speech has ended.');
        this.setState({ listening: false })
      }

      recognition.onerror = e => {
        this.setState({
          outputBot : 'Error: ' + e.error
        })
      }

    }

    synthVoice = (text) => {
        console.log("Speech synth", text);
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        synth.speak(utterance);
    }

    render() {
      const {name, id, vicinity} = this.props.selectedPlace;
      const map_link = `https://www.google.com/maps/search/?api=1&query_place_id=${id}&query=${vicinity}`;
      return (
        <MDBRow className="product-search">
            <MDBCol md="12" lg="4">
            </MDBCol>
            <MDBCol md="12" lg="4">
                <MDBRow className="back-to-map-button-container justify-content-center">
                    <MDBCol sm="12">
                        <MDBBtn className="back-to-map-button btn-lighter-green" onClick={this.props.navigateToMap}>
                            <FontAwesomeIcon className="back-to-map-icon" icon="long-arrow-alt-left" /> Select another store
                        </MDBBtn>
                        <p className="product-search-subtitle voice-search">
                          <span className="font-weight-bold">Your selected store</span>
                          <span className="grocery-stores--store-name">{name}</span>
                          <span className="grocery-stores--store-address">{vicinity}</span>
                          <span className="grocery-stores--google-map"><a href={map_link} target="_blank">Open Google Maps</a></span>
                        </p>
                        <hr className="hr-red"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="microphone-button-container justify-content-center">
                    <MDBCol sm="12">
                        <p className="font-weight-bold">What are you looking for?</p>
                        <p className="microphone-anser-tip">
                          { !this.state.listening ? 'Tap to answer' : 'I\'m listening!'}
                        </p>
                        <button className="microphone" onClick={this.toggleListen}>
                            <FontAwesomeIcon icon="microphone" className="icon"/>
                        </button>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="voice-search-info-container justify-content-center">
                    <div className="voice-search-info">
                        <p><em className="output-you">{ this.state.outputYou }</em></p>
                        {/* <p><em className="output-bot">{ this.state.outputBot }</em></p> */}
                    </div>
                    {/* <div className="info-display">{ this.state.infoDisplay }</div> */}
                </MDBRow>
            </MDBCol>
            <MDBCol md="12" lg="4">
            </MDBCol>
        </MDBRow>
      );
    }
}

export default App;