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
    case 'updateLocated' :
      return {
        ...state,
        located: action.payload.located,
        lat: action.payload.lat,
        lng: action.payload.lng
      }
    case 'update' :
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

    const update = (payload) => {
      dispatch({ type : 'update', payload});
    }

    const postalCode = state.postalCode === "you" ? "you" : <strong>{state.postalCode}</strong>;

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
            <section className="store-selection store-selection-title-container">
              { !state.located &&
                <Fragment>
                  <h2 className="store-selection-title store-selection-title-welcome">Welcome! </h2>
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
                        }} onClick={() => update(false)}>Back</Link>
                  </div>
                  <h2 className="store-selection-title store-selection-title-nearby">Stores nearby {postalCode}</h2>
                </Fragment>
              }
            </section>
            <section className="store-selection store-selection-google-map">
              <GoogleMap
                  onStoreSelection={onStoreSelection}
                  located={state.located}
                  lat={state.lat}
                  lng={state.lng}
                  updateLocated={updateLocated}
                  places={state.places}
                  setPlaces={setPlaces}
                  setPostalCode={setPostalCode}
                  navigatedToStepOne={state.navigatedToStepOne}
                  updateNavigatedToStepOne={updateNavigatedToStepOne}
                />
              </section>
          </Route>
          <Route path={`${match.url}/select-products`}>
          {
            Object.keys(state.selectedPlace).length === 0 ? <Redirect to={`${match.url}/select-store`} /> :
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
            Object.keys(state.selectedPlace).length === 0 ? <Redirect to={`${match.url}/select-store`} /> :
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
            <section className="account-section">
              <Account
                    selectedPlaces={state.selectedPlaces}
                    onStoreSelection={onStoreSelection}
                    removeStoreFromSelectedStoreList={removeStoreFromSelectedStoreList}
              />
            </section>
          </Route>
          <Route path={`${match.url}/shopping-list`}>
            <section className="shopping-list-section">
              <ShoppingList
                    groceryList={state.groceryList}
                    removeItemFromShoppingList={removeItemFromShoppingList}
                    clearShoppingList={clearShoppingList}
              />
              </section>
          </Route>
          <Route path={`${match.url}/saved-maps`}>
            <section className="saved-maps-section">
              <SavedMaps />
            </section>
          </Route>
          <Route path={`${match.url}/bulletin`}>
            <section className="bulletin-section">
              <Bulletin />
            </section>
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