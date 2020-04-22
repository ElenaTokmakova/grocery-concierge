import React, {Component} from 'react';
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
      conciergeImage : conciergeImage
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

    render() {
      return (
        <Container className="app-container text-center">
          <h1>Grocery Concierge</h1>
          <h2>How can I help you today?</h2>

          <Row>
            <img className="image-concierge" src={this.state.conciergeImage} />
          </Row>

          <Row>
            <button onClick={this.toggleListen}><i className="fa fa-microphone icon"></i></button>
          </Row>

          <div className="voice-recognition-info">
              <p>Listening? { this.state.listening.toString() }</p>
              <p>You said: <em className="output-you">{ this.state.outputYou }</em></p>
              <p>Concierge replied: <em className="output-bot">{ this.state.outputBot }</em></p>
          </div>
          <div className="info-display">{ this.state.infoDisplay }</div>


          <section className="google-map">
            <Container>
              <GoogleMap/>
            </Container>
          </section>

        </Container>
      );
    }
}

export default App;