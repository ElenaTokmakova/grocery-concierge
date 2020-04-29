import React, {Component} from 'react';
import { MDBRow, MDBCol, MDBBtn, MDBListGroup, MDBListGroupItem, MDBCard, MDBCardBody, MDBCardTitle, MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltLeft, faAppleAlt, faBacon, faBox, faBreadSlice, faCandyCane, faCarrot, faCheese, faCookie, faEgg, faFish, faHamburger, faHotdog, faLemon, faPepperHot, faPizzaSlice, faStroopwafel, faMicrophone, faToiletPaper, faDrumSteelpan, faTrash } from '@fortawesome/free-solid-svg-icons'
// a standalone build of socket.io-client is exposed automatically by the socket.io server
import socketIOClient from "socket.io-client";
import stringSimilarity from 'string-similarity';
import axios from 'axios';

library.add(faLongArrowAltLeft, faAppleAlt, faBacon, faBox, faBreadSlice, faCandyCane, faCarrot, faCheese, faCookie, faEgg, faFish, faHamburger, faHotdog, faLemon, faPepperHot, faPizzaSlice, faStroopwafel, faMicrophone, faToiletPaper, faDrumSteelpan, faTrash );

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
            grocery_list: [],
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

        axios.get(DEV_URL + '/products', {
            // cancel token used by axios
            cancelToken: this._source.token
          })
          .then(data => {
              console.log('Got data from Express server!', data.data);
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
              outputBot: response.reply,
              infoDisplay: response.info
          })

          if (response.type === 'where') {
            const matches = stringSimilarity.findBestMatch(response.term, this.state.product_names);
            console.log("Matches", matches);
            if (matches.bestMatch.target) {
              const includes = this.state.grocery_list.map(element => element.name).includes(matches.bestMatch.target);
              if (!includes) {
                this.setState({
                  grocery_list: [ ...this.state.grocery_list, { name: matches.bestMatch.target, location: response.location } ]
                })
              }
            }
            console.log("Grocery list", this.state.grocery_list)
          }

        });
    }

    // Invoked right before React unmounts and destroys the component
    componentWillUnmount() {
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
          recognition.onend = () => {
            console.log("Continue listening...");
            recognition.start();
          }
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

        this.setState({
          outputYou: text
        })

        console.log('Confidence: ' + e.results[0][0].confidence);

        socket.emit('customer query', text);
      }

      recognition.onspeechend = () => {
        console.log('Speech has ended.');
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

    renderProducts() {
        return (
            <MDBListGroup className="available-products-container">
                {
                    this.state.products.map(product => {
                        return (
                            <MDBListGroupItem key={product.name}>
                                <MDBRow>
                                    <MDBCol sm="5"><FontAwesomeIcon icon={product.class} /></MDBCol>
                                    <MDBCol sm="7" className="text-left"><span>{product.name}</span></MDBCol>
                                </MDBRow>
                            </MDBListGroupItem>
                        )
                    })
                }
            </MDBListGroup>
        )
    }

    removeItemFromShoppingList = (name) => {
      const newGroceryList = this.state.grocery_list.filter(element => element.name !== name);
      this.setState({
        grocery_list : newGroceryList
      })
    }

    renderGroceryList() {
      return (
        <MDBTableBody>
          {
            this.state.grocery_list.map(product => {
                  const { name, location } = product;
                  return (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>{location}</td>
                      <td><FontAwesomeIcon onClick={this.removeItemFromShoppingList.bind(this, name)} icon="trash" className="clear-shopping-list-icon"/></td>
                    </tr>
                  )
              })
          }
        </MDBTableBody>
      );
    }

    clearShoppingList = () => {
      this.setState({
        grocery_list: []
      })
    }

    render() {
      const store = this.props.selectedPlace.name;
      return (
        <section className="product-search row">
            <MDBCol sm="12" md="4">
                <p className="product-search-subtitle">COVID essential product</p>
                {
                    this.state.products.length > 0 && this.renderProducts()
                }
            </MDBCol>
            <MDBCol sm="12" md="4">
                <MDBRow className="back-to-map-button-container justify-content-center">
                    <MDBCol sm="12">
                        <p className="product-search-subtitle">You have selected <strong>{store}</strong></p>
                        <MDBBtn color="primary" className="back-to-map-button" onClick={this.props.navigateToMap}>
                            <FontAwesomeIcon className="back-to-map-icon" icon="long-arrow-alt-left" /> Select another store
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="microphone-button-container justify-content-center">
                    <MDBCol sm="12">
                        <button className="microphone" onClick={this.toggleListen}>
                            <FontAwesomeIcon icon="microphone" className="icon"/>
                        </button>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="voice-search-info-container justify-content-center">
                <MDBCard>
                    <MDBCardBody>
                    <MDBCardTitle><p>{ !this.state.listening ? 'Click or tap the microphone to start speaking' : 'I\'m listening! Click again to finish your search'}</p></MDBCardTitle>
                    <div className="voice-search-info">
                        <p>You said: <em className="output-you">{ this.state.outputYou }</em></p>
                        <p>Concierge replied: <em className="output-bot">{ this.state.outputBot }</em></p>
                    </div>
                    <div className="info-display">{ this.state.infoDisplay }</div>
                    </MDBCardBody>
                </MDBCard>
                </MDBRow>
            </MDBCol>
            <MDBCol sm="12" md="4">
                <p className="product-search-subtitle">Your shopping list</p>
                <MDBTable striped bordered responsive hover>
                  <MDBTableHead textWhite color="primary-color">
                    <tr>
                      <th>Product</th>
                      <th>Location</th>
                      <th>Remove</th>
                    </tr>
                  </MDBTableHead>
                  {
                    this.state.grocery_list.length > 0 && this.renderGroceryList()
                  }
                </MDBTable>
                {
                  this.state.grocery_list.length > 0 &&
                  <MDBBtn color="primary" className="back-to-map-button" onClick={this.clearShoppingList}>Clear shopping list</MDBBtn>
                }
            </MDBCol>
        </section>
      );
    }
}

export default App;