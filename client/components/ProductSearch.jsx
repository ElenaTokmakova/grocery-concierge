import React, { useReducer, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

const initialState = {
    products: [],
    listening: false,
    outputYou: '',
    outputBot: '',
    infoDisplay: ''
};

const reducer = (state, action) => {
  console.log('State, action', state, action)
  switch (action.type) {
    case 'products':
      return {
          ...state,
          products: action.payload
      };
    case 'socketResponse':
      return {
          ...state,
          listening: false,
          outputBot: action.payload.reply,
          infoDisplay: action.payload.location
      };
    case 'toggleListen':
      return {
          ...state,
          listening: action.payload
      };
    case 'stopListening':
      return {
          ...state,
          listening: false
      };
    case 'speechStart':
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

const ProductSearch = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const {name, id, vicinity} = props.selectedPlace;
    const map_link = `https://www.google.com/maps/search/?api=1&query_place_id=${id}&query=${vicinity}`;
    const url = DEV_URL + '/mapping';

    // function annotated with async returns an implicit promise
    // an effect hook should return nothing or a clean up function
    // you can call an async function inside an effect

    useEffect(() => {

        // Set up a cancellation source
        let source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                const result = await axios(url, {
                    // Assign the source.token to this request
                    cancelToken: source.token
                });
                dispatch({ type: 'products', payload: result.data });
            } catch(error) {
                // Is this error because we cancelled it?
                if (axios.isCancel(error)) {
                    console.log(`Call for essential products was cancelled`);
                } else {
                    setShow(true);
                }
            }
        };

        fetchData();

        return () => {
            // Let's cancel the request on effect cleanup
            source.cancel();
        };

      },
      [url]
    );

    useEffect(() => {
      handleListen();
    }, [state.listening]);

    useEffect(() => {
      attachSocketListener();
      return () => {
        socket.off();
      };
    }, [])

    const attachSocketListener = () => {
      socket.on('response', (response) => {
        console.log('Socket response', response);
        synthVoice(response.reply);

        if(response.reply == '') response.reply = '(No answer...)';

        dispatch({ type: 'socketResponse', payload: { reply: response.reply, location: response.location } });

        if (response.type === 'where') {
          const includes = props.groceryList.map(element => element.name).includes(response.name);
          if (!includes) {
            props.addItemToGroceryList({ name: response.name, location: response.info });
          }
          props.setProductLocation(response.reply);
          props.goToStepThree();
        }

      });
    }

    // turn speech recognition on and off
    const toggleListen = () => {
      const listening = !state.listening;
      dispatch({ type: 'toggleListen', payload: listening});
    }

    // handle all of the speech recognition logic
    const handleListen = () => {
      console.log('Listening?', state.listening);

      if (state.listening) {
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
        dispatch({ type: 'speechStart' })
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

      recognition.onspeechend = () => {
        console.log('Speech has ended.');
        dispatch({ type: 'stopListening' });
      }

      recognition.onerror = e => {
        console.log('Recognition error', e.error)
        dispatch({ type: 'outputBotError', payload: e.error });
      }

    }

    const synthVoice = (text) => {
        console.log("Speech synth", text);
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        synth.speak(utterance);
    }

    return (
      <section className="product-search-section">
        <MDBRow className="product-search">
            <MDBCol md="12" lg="4">
            </MDBCol>
            <MDBCol md="12" lg="4">
                <MDBRow className="back-to-map-button-container justify-content-center">
                    <MDBCol sm="12">
                      <Link to={{
                          pathname: '/select-store'
                      }} onClick={props.goToStepOne}>
                          <MDBBtn className="back-to-map-button btn-lighter-green">
                            <FontAwesomeIcon className="back-to-map-icon" icon="long-arrow-alt-left" /> Select another store
                        </MDBBtn>
                      </Link>
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
                          { !state.listening ? 'Tap to answer' : 'I\'m listening!'}
                        </p>
                        <button className="microphone" onClick={toggleListen}>
                            <FontAwesomeIcon icon="microphone" className="icon"/>
                        </button>
                    </MDBCol>
                </MDBRow>
                {/* <MDBRow className="voice-search-info-container justify-content-center">
                    <div className="voice-search-info">
                        <p><em className="output-you">{ state.outputYou }</em></p>
                        <p><em className="output-bot">{ state.outputBot }</em></p>
                    </div>
                    <div className="info-display">{ state.infoDisplay }</div>
                </MDBRow> */}
            </MDBCol>
            <MDBCol md="12" lg="4">
            </MDBCol>
        </MDBRow>
      </section>
    );
}

export default withRouter(ProductSearch);