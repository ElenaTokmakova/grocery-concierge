import React, {Component} from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
// a standalone build of socket.io-client is exposed automatically by the socket.io server
import socketIOClient from "socket.io-client";
import axios from 'axios';
import GoogleMap from './GoogleMap';
import conciergeImage from "../assets/images/concierge.jpg";

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

    state = {
      data: [],
      listening: false,
      outputYou: '',
      outputBot: '',
      infoDisplay: '',
      conciergeImage : conciergeImage,
      selectedPlace: {},
      navigateToStore: false
    };

    componentDidMount(){

        // sample request to test calls to Express server; this route returns json data

        // cancel previous request
        if (typeof this._source != typeof undefined) {
          this._source.cancel('Operation canceled due to new request')
        }

        // save the new request for cancellation
        this._source = axios.CancelToken.source();

        axios.get(DEV_URL + '/default', {
            // cancel token used by axios
            cancelToken: this._source.token
          })
          .then(data => {
              // do something with the data
              console.log('Got mock data from Express server!', data.data);
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
          console.log('Socket on response: response', response);
          component.synthVoice(response.reply);

          if(response.reply == '') response.reply = '(No answer...)';

          component.setState({
              outputBot: response.reply,
              infoDisplay: response.info
          })
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
        console.log('Result has been detected.');

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

    onStoreSelection = (e, selectedPlace) => {
      console.log("On store selection", selectedPlace)
      this.setState({
        navigateToStore: true,
        selectedPlace
      }, () => {
        console.log("State: ", this.state)
      });
    }

    navigateToMap = () => {
      this.setState({
        navigateToStore: false,
        selectedPlace: {}
      })
    }

    render() {
      return (
        <Container className="app-container text-center">
          <h1>Grocery Concierge</h1>

          <Row className="logo-container">
            <img className="image-concierge" src={this.state.conciergeImage} />
          </Row>

          <Router>
            <Switch>
              <Route path="/select-store">
              <h2>Please select a store</h2>
              {
                this.state.navigateToStore === false &&
                <section className="google-map">
                  <GoogleMap onStoreSelection={this.onStoreSelection}/>
                </section>
              }
              {
                this.state.navigateToStore === true &&
                <Redirect to="/select-products" store={this.state.selectedPlace}/>
              }
              </Route>
              <Route path="/select-products" store={this.state.selectedPlace}>
                {
                  this.state.navigateToStore === true &&
                  <section className="product-search">
                    <Row className="back-to-map-button-container justify-content-center">
                      <Button color="primary" className="back-to-map-button" onClick={this.onButtonClick} onClick={this.navigateToMap}>
                        <i className="fa fa-long-arrow-left" aria-hidden="true"></i> Select another store
                      </Button>
                    </Row>
                    <Row className="microphone-button-container justify-content-center">
                      <button className="microphone" onClick={this.toggleListen}><i className="fa fa-microphone icon" aria-hidden="true"></i></button>
                    </Row>
                    <Row className="voice-search-info-container justify-content-center">
                    <Card>
                      <CardBody>
                        <CardTitle><p>{ !this.state.listening ? 'Click or tap the microphone to start speaking' : 'I\'m listening! Click again to finish your search'}</p></CardTitle>
                        <div className="voice-search-info">
                            <p>You said: <em className="output-you">{ this.state.outputYou }</em></p>
                            <p>Concierge replied: <em className="output-bot">{ this.state.outputBot }</em></p>
                        </div>
                        <div className="info-display">{ this.state.infoDisplay }</div>
                      </CardBody>
                    </Card>
                    </Row>
                  </section>
                }
                {
                this.state.navigateToStore === false &&
                  <Redirect to="/select-store"/>
                }
              </Route>
              <Route exact path="/">
                <Redirect to="/select-store" />
              </Route>
            </Switch>
          </Router>

        </Container>
      );
    }
}

export default App;