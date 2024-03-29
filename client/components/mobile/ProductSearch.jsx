import React, { useReducer, useEffect,  useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import MobileContext from './Context';
import { MDBRow, MDBCol } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavigateBack from './components/NavigateBack';
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

const ProductSearch = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { concierge, customer } = useContext(MobileContext);
    const history = useHistory();
    const match = useRouteMatch();

    let found = false;

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

    const onNavigateToStepThree = () => {
      history.push("/mobile/search-results");
    }

    const attachSocketListener = () => {
      socket.on('response', (response) => {
        console.log('Socket response', response);
        synthVoice(response.reply);

        if(response.reply == '') response.reply = '(No answer...)';

        if (response.type === 'where') {
          found = true;
          const includes = props.groceryList.map(element => element.name).includes(response.name);
          if (!includes) {
            props.addItemToGroceryList({ name: response.name, location: response.info });
          }
          props.setProductLocation(response.reply);
        }

        dispatch({ type: 'socketResponse', payload: { reply: response.reply, location: response.info } });

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

      recognition.onspeechend = () => {
        console.log('Speech has ended.');
        dispatch({ type: 'stopListening' });
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
          console.log("Finished talking, found?", state)
          if (found) {
            onNavigateToStepThree();
          } else {
            dispatch({ type: 'reset' });
          }
        }
    }

    return (
      <section className="product-search-section">
        <MDBRow className="product-search">
              <MDBCol md="4" className="offset-md-4">
                <MDBRow className="back-to-map-button-container justify-content-center">
                    <MDBCol sm="12">
                      <NavigateBack pathname="/mobile/select-store" text="Select another store"/>
                        <p className="selected-store">
                          <span className="font-weight-bold">Your Selected Store:</span>
                          <span className="store-name">{name}</span>
                          <span className="store-address">{vicinity}</span>
                          <span className="google-map"><a href={map_link} target="_blank">Open Google Maps</a></span>
                        </p>
                        <hr className="hr-red"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="microphone-button-container justify-content-center">
                    <MDBCol sm="12">
                        <div className="conversation-container conversation-container--concierge">
                          <img className="grocery-concierge-icon" src={concierge} alt="Grocery Concierge icon"/>
                          <span><strong>What are you looking for?</strong></span>
                        </div>
                        <div className="conversation-container conversation-container--customer">
                          <span><strong>{state.outputYou}</strong></span>
                          <img className="grocery-concierge-icon" src={customer} alt="Grocery Concierge icon"/>
                        </div>
                        {
                          state.outputBot &&
                            <div className="conversation-container conversation-container--concierge">
                              <img className="grocery-concierge-icon" src={concierge} alt="Grocery Concierge icon"/>
                              <span><strong>{state.outputBot}</strong></span>
                          </div>
                        }
                        {
                          !state.outputBot &&
                          <div className="text-center">
                            <p className="microphone-answer-tip">
                              { !state.listening ? 'Tap to answer' : 'I\'m listening!'}
                            </p>
                            <button className="microphone" onClick={toggleListen}>
                                <FontAwesomeIcon icon="microphone" className="icon"/>
                            </button>
                          </div>
                        }
                    </MDBCol>
                </MDBRow>
            </MDBCol>
        </MDBRow>
      </section>
    );
}

export default ProductSearch;