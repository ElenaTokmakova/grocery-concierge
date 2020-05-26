import React, { Fragment, useReducer, useEffect } from 'react';
import {
  Route,
  Redirect,
  useRouteMatch,
  Link
} from "react-router-dom";
import MobileContext from './Context';
import { MDBContainer } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header';
import GoogleMap from './GoogleMap';
import ProductSearch from './ProductSearch';
import SearchResults from './SearchResults';
import ShoppingList from './ShoppingList';
import SavedMaps from './SavedMaps';
import Bulletin from './Bulletin';
import Account from './Account';
import concierge from '../../assets/images/concierge.svg';
import customer from '../../assets/images/customer.svg';

const initialState = {
    selectedPlace: {},
    selectedPlaces: [],
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
    case 'products':
      return {
          ...state,
          products: action.payload
      };
    case 'storeSelection':
      return {
          ...state,
          selectedPlace: action.payload.selectedPlace,
          selectedPlaces: action.payload.selectedPlaces
      };
    case 'updateSelectedStoreList':
      return {
          ...state,
          selectedPlaces: action.payload
      };
    case 'setProductLocation':
      return {
        ...state,
        productLocation: action.payload
      }
    case 'updateLocatedAndCoordinates' :
      return {
        ...state,
        located: action.payload.located,
        lat: action.payload.lat,
        lng: action.payload.lng
      }
    case 'updateLocated' :
      return {
        ...state,
        located: action.payload
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
      const selectedPlaces = state.selectedPlaces.filter(element => selectedPlace.id === element.id).length === 0 ? [...state.selectedPlaces, selectedPlace] : state.selectedPlaces;
      dispatch({ type: 'storeSelection', payload: {selectedPlace, selectedPlaces} });
    }

    const addItemToGroceryList = (item) => {
      const newGroceryList = [ ...state.groceryList, item ];
      dispatch({type: 'updateGroceryList', payload: newGroceryList });
    }

    const removeItemFromShoppingList = (name) => {
      const newGroceryList = state.groceryList.filter(element => element.name !== name);
      dispatch({ type: 'updateGroceryList', payload: newGroceryList });
    }

    const removeStoreFromSelectedStoreList = (store) => {
      const newSelectedStoreList = state.selectedPlaces.filter(element => element.id !== store.id);
      dispatch({ type: 'updateSelectedStoreList', payload: newSelectedStoreList });
    }

    const clearShoppingList = () => {
      dispatch({ type: 'updateGroceryList', payload: [] });
    }

    const setProductLocation = (location) => {
      dispatch({ type: 'setProductLocation', payload: location });
    }

    const updateLocatedAndCoordinates = (located, lat, lng) => {
      dispatch({ type : 'updateLocatedAndCoordinates', payload : { located, lat, lng }});
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

    const updateLocated = (payload) => {
      dispatch({ type : 'updateLocated', payload});
    }

    const postalCode = state.postalCode === "you" ? "you" : <strong>{state.postalCode}</strong>;
    const placeSelected = Object.keys(state.selectedPlace).length > 0;

    return (

      <MobileContext.Provider value={{
        concierge,
        customer
      }}>

        <MDBContainer className="mobile-app-container">

          <Header
              groceryList={state.groceryList}
              removeItemFromShoppingList={removeItemFromShoppingList}
              clearShoppingList={clearShoppingList}
          />

          <main className="mobile-main-content">

            <Route path={`${match.url}/select-store`}>
              <section className="mobile-section mobile-section-store-selection mobile-section-store-selection-title-container">
                { !state.located &&
                  <Fragment>
                    <h2 className="mobile-section-store-selection-title mobile-section-store-selection-title-welcome">Welcome! </h2>
                    <p>Start searching for your nearest grocery store here </p>
                  </Fragment>
                }
                {
                  state.located &&
                  <Fragment>
                    <div className="back-navigation">
                        <FontAwesomeIcon className="back-icon" icon="chevron-left"/>
                        <Link className="back-link" to={{
                              pathname: `/mobile/select-store`
                          }} onClick={() => updateLocated(false)}>Back</Link>
                    </div>
                    <h2 className="mobile-section-store-selection-title mobile-section-store-selection-title-nearby">Stores nearby {postalCode}</h2>
                  </Fragment>
                }
              </section>
              <GoogleMap
                  onStoreSelection={onStoreSelection}
                  located={state.located}
                  lat={state.lat}
                  lng={state.lng}
                  updateLocatedAndCoordinates={updateLocatedAndCoordinates}
                  places={state.places}
                  setPlaces={setPlaces}
                  setPostalCode={setPostalCode}
                  navigatedToStepOne={state.navigatedToStepOne}
                  updateNavigatedToStepOne={updateNavigatedToStepOne}
                />
          </Route>
          <Route path={`${match.url}/select-products`}>
          {
            !placeSelected ? <Redirect to={`${match.url}/select-store`} /> :
              <ProductSearch
                    setProductLocation={setProductLocation}
                    selectedPlace={state.selectedPlace}
                    addItemToGroceryList={addItemToGroceryList}
                    groceryList={state.groceryList}
                    lat={state.lat}
                    lng={state.lng}
                />
          }
          </Route>
          <Route path={`${match.url}/search-results`}>
          {
            !placeSelected ? <Redirect to={`${match.url}/select-store`} /> :
              <SearchResults
                    groceryList={state.groceryList}
                    removeItemFromShoppingList={removeItemFromShoppingList}
                    clearShoppingList={clearShoppingList}
                    selectedPlace={state.selectedPlace}
                    productLocation={state.productLocation}
                />
          }
          </Route>
          <Route path={`${match.url}/account`}>
            <Account
                    selectedPlaces={state.selectedPlaces}
                    onStoreSelection={onStoreSelection}
                    removeStoreFromSelectedStoreList={removeStoreFromSelectedStoreList}
              />
          </Route>
          <Route path={`${match.url}/shopping-list`}>
              <ShoppingList
                    groceryList={state.groceryList}
                    removeItemFromShoppingList={removeItemFromShoppingList}
                    clearShoppingList={clearShoppingList}
              />
          </Route>
          <Route path={`${match.url}/saved-maps`}>
              <SavedMaps />
          </Route>
          <Route path={`${match.url}/bulletin`}>
              <Bulletin />
          </Route>
          <Route exact path="/mobile">
            <Redirect to={`${match.url}/select-store`} />
          </Route>

          </main>

        </MDBContainer>

      </ MobileContext.Provider>
    );
}

export default App;