import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { MDBContainer, MDBRow } from "mdbreact";
import Header from './Header';
import Hero from './Hero';
import GoogleMap from './GoogleMap';
import ProductSearch from './ProductSearch';
import SearchResults from './SearchResults';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltLeft, faMicrophone, faAngleRight, faMapMarker, faAppleAlt, faBacon, faBox, faBreadSlice, faCandyCane, faCarrot, faCheese, faCookie, faEgg, faFish, faHamburger, faHotdog, faLemon, faPepperHot, faPizzaSlice, faStroopwafel, faToiletPaper, faDrumSteelpan, faTrash, faScroll, faPumpMedical } from '@fortawesome/free-solid-svg-icons'
// a standalone build of socket.io-client is exposed automatically by the socket.io server
library.add(faLongArrowAltLeft, faMicrophone, faAngleRight, faMapMarker, faAppleAlt, faBacon, faBox, faBreadSlice, faCandyCane, faCarrot, faCheese, faCookie, faEgg, faFish, faHamburger, faHotdog, faLemon, faPepperHot, faPizzaSlice, faStroopwafel, faToiletPaper, faDrumSteelpan, faTrash, faScroll, faPumpMedical );

class App extends Component {

    state = {
      selectedPlace: {},
      navigateToMap: true,
      navigateToStore: false,
      navigateToSearchResults: false,
      postalCode: 'you',
      currentLocation: '',
      essentialProducts: [],
      groceryList: [],
      productLocation: '',
      showHeroSection: true,
      located: false
    };

    onStoreSelection = (selectedPlace) => {
      this.setState({
        navigateToMap: false,
        navigateToStore: true,
        navigateToSearchResults: false,
        selectedPlace
      }, () => {
        // console.log("State: ", this.state)
      });
    }

    navigateToMap = () => {
      this.setState({
        navigateToMap: true,
        navigateToStore: false,
        navigateToSearchResults: false,
        selectedPlace: {}
      })
    }

    navigateToStore = () => {
      this.setState({
        navigateToMap: false,
        navigateToStore: true,
        navigateToSearchResults: false,
      })
    }

    navigateToSearchResults = () => {
      this.setState({
        navigateToMap: false,
        navigateToStore: false,
        navigateToSearchResults: true
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

    hideHeroSection = () => {
      this.setState({ showHeroSection: false })
    }

    updateLocated = (located) => {
      this.setState({ located })
    }

    render() {
       return (
        <MDBContainer className="app-container text-center">

          <Header />

          {
            (this.state.showHeroSection || !this.state.navigateToMap) && <Hero />
          }

          <Router>
            <Switch>
              <Route path="/select-store">
                    <h2 className="store-selection-title">Stores nearby {this.state.postalCode}</h2>
                    {
                      (this.state.navigateToMap && !this.state.navigateToStore && !this.state.navigateToSearchResults) &&
                        <section className="google-map">
                          <GoogleMap onStoreSelection={this.onStoreSelection} hideHeroSection={this.hideHeroSection} located={this.state.located} updateLocated={this.updateLocated}/>
                        </section>
                    }
                    {
                      (!this.state.navigateToMap) &&
                        <Redirect to="/select-products"/>
                    }
              </Route>
              <Route path="/select-products">
                    {
                      (this.state.navigateToMap && !this.state.navigateToStore && !this.state.navigateToSearchResults) &&
                        <Redirect to="/select-store"/>
                    }
                    {
                      (!this.state.navigateToMap && this.state.navigateToStore && !this.state.navigateToSearchResults ) &&
                        <ProductSearch
                          setProductLocation={this.setProductLocation}
                          selectedPlace={this.state.selectedPlace}
                          navigateToMap={this.navigateToMap}
                          navigateToSearchResults={this.navigateToSearchResults}
                          addItemToGroceryList={this.addItemToGroceryList}
                          groceryList={this.state.groceryList}
                        />
                    }
                    {
                    (!this.state.navigateToMap && !this.state.navigateToStore && this.state.navigateToSearchResults) &&
                      <Redirect to="/search-results"/>
                    }
              </Route>
              <Route path="/search-results">
                    {
                      (this.state.navigateToMap && !this.state.navigateToStore && !this.state.navigateToSearchResults) &&
                        <Redirect to="/select-store"/>
                    }
                    {
                      (!this.state.navigateToMap && this.state.navigateToStore && !this.state.navigateToSearchResults) &&
                        <Redirect to="/select-products"/>
                    }
                    {
                      (!this.state.navigateToMap && !this.state.navigateToStore && this.state.navigateToSearchResults) &&
                        <SearchResults
                          groceryList={this.state.groceryList}
                          removeItemFromShoppingList={this.removeItemFromShoppingList}
                          clearShoppingList={this.clearShoppingList}
                          navigateToStore={this.navigateToStore}
                          navigateToMap={this.navigateToMap}
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