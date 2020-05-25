import React, { Fragment, useReducer, useEffect } from 'react';
// a standalone build of socket.io-client is exposed automatically by the socket.io server
import socketIOClient from "socket.io-client";

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

const initialState = {
    outputYou: '',
    outputBot: '',
    infoDisplay: ''
};

const reducer = (state, action) => {
  console.log("Type", action.type, action.payload)
  switch (action.type) {
    case 'socketResponse':
      return {
          ...state,
          outputBot: action.payload.reply,
          infoDisplay: action.payload.location
      };
    case 'reset':
      return {
          ...state,
          outputBot: '',
          outputYou: '',
          infoDisplay: ''
      };
    case 'outputYou':
      return {
          ...state,
          outputYou: action.payload
      };
    case 'outputBotError':
      return {
          ...state,
          outputBot: action.payload
      };
    default:
        throw new Error();
    }
}

const Recognition = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      attachSocketListener();
      handleListen();
      return () => {
        socket.off();
      };
    }, []);

    const attachSocketListener = () => {
      socket.on('response', (response) => {
        console.log('Socket response', response);
        synthVoice(response.reply);

        if(response.reply == '') response.reply = '(No answer...)';

        dispatch({ type: 'socketResponse', payload: { reply: response.reply, location: response.info } });

      });
    }

    // handle all of the speech recognition logic
    const handleListen = () => {

      recognition.start();
      recognition.onend = () => {
        console.log("Continue listening...");
        recognition.start();
      }

      recognition.onstart = () => {
        console.log("Recognition started!");
      }

      recognition.onspeechstart = () => {
        console.log('Speech has been detected.');
        dispatch({ type: 'reset' });
      }

      recognition.onresult = (e) => {
        console.log('Result has been detected.', e);

        const last = e.results.length - 1;
        const text = e.results[last][0].transcript;
        console.log("Text", text);
        console.log('Confidence: ' + e.results[0][0].confidence);
        socket.emit('customer query', text);
        dispatch({ type: 'outputYou', payload: text });
      }

      recognition.onerror = e => {
        console.log('Recognition error', e.error)
        dispatch({ type: 'outputBotError', payload: 'Sorry, I couldn\'t understand you!' });
        setTimeout(() => {
          dispatch({ type: 'reset' });
        }, 2000);
      }

    }

    const synthVoice = (text) => {
        console.log("Speech synth", text);
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        synth.speak(utterance);
        utterance.onend = () => {
            console.log("Utterance ended");
            dispatch({ type: 'reset' });
        }
    }

    return (
        <Fragment>
            { props.children }
        </Fragment>
    )
}

export default Recognition;