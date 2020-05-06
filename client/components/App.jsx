import React, {Component, Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { MDBContainer } from "mdbreact";
import Loading from './Loading';
import Header from './Header';
import Hero from './Hero';
import GoogleMap from './GoogleMap';
import ProductSearch from './ProductSearch';
import SearchResults from './SearchResults';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltLeft, faMicrophone, faAngleRight, faMapMarker, faBox, faEgg, faFish, faToiletPaper, faScroll, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faLongArrowAltLeft, faMicrophone, faAngleRight, faMapMarker, faBox, faEgg, faFish, faToiletPaper, faScroll, faTrash );

class App extends Component {

    state = {
      loading: true,
      selectedPlace: {},
      stepOne: true,
      stepTwo: false,
      stepThree: false,
      postalCode: 'you',
      currentLocation: '',
      groceryList: [],
      productLocation: '',
      located: false,
      lat: 43.643500,
      lng: -79.393520
    };

    componentDidMount() {

      setTimeout( () => this.setState({ loading: false }), 1500 )

    }

    onStoreSelection = (selectedPlace) => {
      this.setState({
        stepOne: false,
        stepTwo: true,
        stepThree: false,
        selectedPlace
      });
    }

    goToStepOne = () => {
      console.log("Going to step one")
      this.setState({
        stepOne: true,
        stepTwo: false,
        stepThree: false,
        selectedPlace: {}
      })
    }

    goToStepTwo = () => {
      console.log("Going to step two")
      this.setState({
        stepOne: false,
        stepTwo: true,
        stepThree: false,
      })
    }

    goToStepThree = () => {
      this.setState({
        stepOne: false,
        stepTwo: false,
        stepThree: true
      })
    }

    addItemToGroceryList = (item) => {
      this.setState({
        groceryList: [ ...this.state.groceryList, item ]
      })
    }

    removeItemFromShoppingList = (name) => {
      const newGroceryList = this.state.groceryList.filter(element => element.name !== name);
      this.setState({
        groceryList : newGroceryList
      })
    }

    clearShoppingList = () => {
      this.setState({
          groceryList: []
      })
    }

    setProductLocation = (location) => {
      this.setState({ productLocation: location })
    }

    updateLocated = (located, lat, lng) => {
      this.setState({ located, lat, lng })
    }

    render() {

      if (this.state.loading) {
        return (
          <Loading isVisible={this.state.loading} />
        )
      }

      return (

          !this.state.loading && <MDBContainer className="app-container text-center">

            <Header />

            {
              (!this.state.located || !this.state.stepOne) && <Hero />
            }

            <Router>
              <Switch>
                <Route path="/select-store">
                      <div className="store-selection-title-container">
                        { !this.state.located &&
                          <Fragment>
                            <h2 className="store-selection-title store-selection-title-welcome">Welcome! </h2>
                            <p>Start searching for your nearest grocery store here </p>
                          </Fragment>
                        }
                        {
                          this.state.located && <h2 className="store-selection-title store-selection-title-nearby">Stores nearby {this.state.postalCode}</h2>
                        }
                      </div>

                      {
                        this.state.stepOne &&
                          <section className="google-map">
                            <GoogleMap
                              onStoreSelection={this.onStoreSelection}
                              located={this.state.located}
                              lat={this.state.lat}
                              lng={this.state.lng}
                              updateLocated={this.updateLocated}
                              />
                          </section>
                      }
                      {
                        (this.state.stepTwo) &&
                          <Redirect to="/select-products"/>
                      }
                </Route>
                <Route path="/select-products">
                      {
                        (this.state.stepOne) && <Redirect to="/select-store"/>
                      }
                      {
                        (this.state.stepTwo ) &&
                          <ProductSearch
                            setProductLocation={this.setProductLocation}
                            selectedPlace={this.state.selectedPlace}
                            goToStepOne={this.goToStepOne}
                            goToStepThree={this.goToStepThree}
                            addItemToGroceryList={this.addItemToGroceryList}
                            groceryList={this.state.groceryList}
                            lat={this.state.lat}
                            lng={this.state.lng}
                          />
                      }
                      {
                      (this.state.stepThree) &&
                        <Redirect to="/search-results"/>
                      }
                </Route>
                <Route path="/search-results">
                      {
                        (this.state.stepOne) && <Redirect to="/select-store"/>
                      }
                      {
                        (this.state.stepTwo) && <Redirect to="/select-products"/>
                      }
                      {
                        (this.state.stepThree) &&
                          <SearchResults
                            groceryList={this.state.groceryList}
                            removeItemFromShoppingList={this.removeItemFromShoppingList}
                            clearShoppingList={this.clearShoppingList}
                            goToStepOne={this.goToStepOne}
                            goToStepTwo={this.goToStepTwo}
                            selectedPlace={this.selectedPlace}
                            productLocation={this.state.productLocation}
                          />
                      }
                </Route>
                <Route exact path="/">
                  <Redirect to="/select-store" />
                </Route>
              </Switch>
            </Router>

          </MDBContainer>
      );
    }
}

export default App;