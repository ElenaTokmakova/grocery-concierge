import React, { Fragment, useReducer, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import { MDBContainer } from "mdbreact";

import Header from './Header';
import Hero from './Hero';
import GoogleMap from './GoogleMap';
import ProductSearch from './ProductSearch';
import SearchResults from './SearchResults';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltLeft, faMicrophone, faAngleRight, faMapMarkerAlt, faBox, faEgg, faFish, faToiletPaper, faScroll, faTrash, faHeart, faQuestion, faSignOutAlt, faCloudUploadAlt, faMobileAlt, faDesktop } from '@fortawesome/free-solid-svg-icons';
library.add(faLongArrowAltLeft, faMicrophone, faAngleRight, faMapMarkerAlt, faBox, faEgg, faFish, faToiletPaper, faScroll, faTrash, faHeart, faQuestion, faSignOutAlt, faCloudUploadAlt, faMobileAlt, faDesktop );

const initialState = {
    selectedPlace: {},
    places: [],
    stepOne: true,
    stepTwo: false,
    stepThree: false,
    navigatedToStepOne: false,
    postalCode: 'you',
    currentLocation: '',
    groceryList: [],
    productLocation: '',
    located: false,
    lat: 43.643500,
    lng: -79.393520
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'stepOne':
      return {
          ...state,
          stepOne: true,
          stepTwo: false,
          stepThree: false,
          navigatedToStepOne: true,
          selectedPlace: {}
      };
    case 'stepTwo':
      return {
          ...state,
          stepOne: false,
          stepTwo: true,
          stepThree: false
      };
    case 'stepThree':
      return {
          ...state,
          stepOne: false,
          stepTwo: false,
          stepThree: true
      };
    case 'products':
      return {
          ...state,
          products: action.payload
      };
    case 'storeSelection':
      return {
          ...state,
          stepOne: false,
          stepTwo: true,
          stepThree: false,
          selectedPlace: action.payload
      };
    case 'setProductLocation':
      return {
        ...state,
        productLocation: action.payload
      }
    case 'updateLocated' :
      return {
        ...state,
        located: action.payload.located,
        lat: action.payload.lat,
        lng: action.payload.lng
      }
    case 'updateNavigatedToStepOne' :
      return {
        ...state,
        navigatedToStepOne: action.payload
      }
    case 'setPlaces' :
      return {
        ...state,
        places: action.payload
      }
    case 'setPostalCode' :
      return {
        ...state,
        postalCode: action.payload
      }
    case 'updateGroceryList' :
      return {
        ...state,
        groceryList: action.payload
      }
    default:
        throw new Error();
    }
}


const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const match = useRouteMatch();

    useEffect(() => {
      // setTimeout( () => dispatch({ type: 'loading', payload: false }), 1500 )
    }, []);

    const onStoreSelection = (selectedPlace) => {
      dispatch({ type: 'storeSelection', payload: selectedPlace });
    }

    const goToStepOne = () => {
        console.log("Going to step one");
      dispatch({ type: 'stepOne' });
    }

    const goToStepTwo = () => {
        console.log("Going to step two");
      dispatch({ type: 'stepTwo' });
    }

    const goToStepThree = () => {
      console.log('Going to step three');
      dispatch({ type: 'stepThree' });
    }

    const addItemToGroceryList = (item) => {
      const newGroceryList = [ ...state.groceryList, item ];
      dispatch({type: 'updateGroceryList', payload: newGroceryList });
    }

    const removeItemFromShoppingList = (name) => {
      const newGroceryList = state.groceryList.filter(element => element.name !== name);
      dispatch({ type: 'updateGroceryList', payload: newGroceryList });
    }

    const clearShoppingList = () => {
      dispatch({ type: 'updateGroceryList', payload: [] });
    }

    const setProductLocation = (location) => {
      dispatch({ type: 'setProductLocation', payload: location });
    }

    const updateLocated = (located, lat, lng) => {
      dispatch({ type : 'updateLocated', payload : { located, lat, lng }});
    }

    const setPlaces = (places) => {
      dispatch({ type: 'setPlaces', payload: places });
    }

    const updateNavigatedToStepOne = (payload) => {
      dispatch({ type: 'updateNavigatedToStepOne', payload });
    }

    const setPostalCode = (payload) => {
      dispatch({ type: 'setPostalCode', payload });
    }

    return (

        <MDBContainer className="app-container text-center">

          <Header />

          <main className="main-content">

            {
              (!state.located || state.stepTwo) && <Hero />
            }

            <Route path={`${match.url}/select-store`}>
            <section className="store-selection-title-container">
              { !state.located &&
                <Fragment>
                  <h2 className="store-selection-title store-selection-title-welcome">Welcome! </h2>
                  <p>Start searching for your nearest grocery store here </p>
                </Fragment>
              }
              {
                state.located && <h2 className="store-selection-title store-selection-title-nearby">Stores nearby {state.postalCode}</h2>
              }
            </section>
            <GoogleMap
                onStoreSelection={onStoreSelection}
                located={state.located}
                lat={state.lat}
                lng={state.lng}
                updateLocated={updateLocated}
                places={state.places}
                setPlaces={setPlaces}
                setPostalCode={setPostalCode}
                goToStepOne={goToStepOne}
                navigatedToStepOne={state.navigatedToStepOne}
                updateNavigatedToStepOne={updateNavigatedToStepOne}
              />
          </Route>
          <Route path={`${match.url}/select-products`}>
          {
            Object.keys(state.selectedPlace).length === 0 ? <Redirect to="/select-store" /> :
              <ProductSearch
                    setProductLocation={setProductLocation}
                    selectedPlace={state.selectedPlace}
                    goToStepOne={goToStepOne}
                    goToStepThree={goToStepThree}
                    addItemToGroceryList={addItemToGroceryList}
                    groceryList={state.groceryList}
                    lat={state.lat}
                    lng={state.lng}
                />
          }
          </Route>
          <Route path={`${match.url}/search-results`}>
          {
            Object.keys(state.selectedPlace).length === 0 ? <Redirect to="/select-store" /> :
              <SearchResults
                    groceryList={state.groceryList}
                    removeItemFromShoppingList={removeItemFromShoppingList}
                    clearShoppingList={clearShoppingList}
                    goToStepOne={goToStepOne}
                    goToStepTwo={goToStepTwo}
                    selectedPlace={state.selectedPlace}
                    productLocation={state.productLocation}
                />
          }
          </Route>
          <Route exact path="/mobile">
            <Redirect to={`${match.url}/select-store`} />
          </Route>

          </main>

        </MDBContainer>
    );
}

export default App;