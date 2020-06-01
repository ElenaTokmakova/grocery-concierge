import React, { Fragment, cloneElement, useReducer, useEffect } from 'react';
// a standalone build of socket.io-client is exposed automatically by the socket.io server
import socketIOClient from "socket.io-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    listening: false,
    intent: '',
    speaking: false,
    outputYou: '',
    outputBot: '',
    infoDisplay: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'socketResponse':
      return {
          ...state,
          intent: action.payload.intent,
          outputBot: action.payload.reply,
          infoDisplay: action.payload.location
      };
    case 'setSpeaking':
    return {
        ...state,
        speaking: action.payload
      };
    case 'toggleListen':
      return {
          ...state,
          listening: action.payload
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
      return () => {
        socket.off();
      };
    }, []);

    useEffect(() => {
      handleListen();
    }, [state.listening]);

    const attachSocketListener = () => {
      socket.on('response', (response) => {
        console.log('Socket response', response);
        synthVoice(response.reply);

        if(response.reply == '') response.reply = '(No answer...)';

        dispatch({ type: 'socketResponse', payload: { reply: response.reply, location: response.info, intent: response.type } });

      });
    }

    // handle all of the speech recognition logic
    const handleListen = () => {

      if (state.listening) {
        recognition.start();
        recognition.onend = () => {
          recognition.start();
        }
      } else {
          recognition.stop();
          recognition.onend = () => {
            console.log("Stopped listening per click");
          }
      }

      recognition.onstart = () => {
        console.log("Recognition started!");
      }

      recognition.onspeechstart = () => {
        console.log('Speech has been detected.');
        // dispatch({ type: 'reset' });
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
          //dispatch({ type: 'reset' });
        }, 2000);
      }

    }

    const synthVoice = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        synth.speak(utterance);
        dispatch({ type: 'setSpeaking', payload: true });
        utterance.onend = () => {
            dispatch({ type: 'setSpeaking', payload: false });
        }
    }

    const toggleListen = () => {
      const listening = !state.listening;
      dispatch({ type: 'toggleListen', payload: listening});
    }

    const color = state.listening ? '#d3452c' : '#3c3c3b';

    return (
        <Fragment>
            <span onClick={toggleListen} className="concierge-bell" style={{ color }}><FontAwesomeIcon icon="concierge-bell"/></span>
            { cloneElement(props.children, { ...state }) }
        </Fragment>
    )
}

export default Recognition;