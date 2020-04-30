import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { MDBContainer, MDBRow } from "mdbreact";
import Header from './Header';
import GoogleMap from './GoogleMap';
import ProductSearch from './ProductSearch';
import SearchResults from './SearchResults';
import conciergeImage from "../assets/images/concierge.jpg";


import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltLeft, faMicrophone, faAppleAlt, faBacon, faBox, faBreadSlice, faCandyCane, faCarrot, faCheese, faCookie, faEgg, faFish, faHamburger, faHotdog, faLemon, faPepperHot, faPizzaSlice, faStroopwafel, faToiletPaper, faDrumSteelpan, faTrash, faScroll, faPumpMedical } from '@fortawesome/free-solid-svg-icons'
// a standalone build of socket.io-client is exposed automatically by the socket.io server
library.add(faLongArrowAltLeft, faMicrophone, faAppleAlt, faBacon, faBox, faBreadSlice, faCandyCane, faCarrot, faCheese, faCookie, faEgg, faFish, faHamburger, faHotdog, faLemon, faPepperHot, faPizzaSlice, faStroopwafel, faToiletPaper, faDrumSteelpan, faTrash, faScroll, faPumpMedical );

class App extends Component {

    state = {
      conciergeImage : conciergeImage,
      selectedPlace: {},
      navigateToMap: true,
      navigateToStore: false,
      navigateToSearchResults: false,
      postalCode: 'you',
      currentLocation: '',
      essentialProducts: [],
      grocery_list: []
    };

    onStoreSelection = (selectedPlace) => {
      console.log("Navigating to store through store selection")
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
      console.log("Navigating to map")
      this.setState({
        navigateToMap: true,
        navigateToStore: false,
        navigateToSearchResults: false,
        selectedPlace: {}
      })
    }

    navigateToStore = () => {
      console.log("Navigating to store")
      this.setState({
        navigateToMap: false,
        navigateToStore: true,
        navigateToSearchResults: false,
      })
    }

    navigateToSearchResults = () => {
      console.log("Navigating to search results")
      this.setState({
        navigateToMap: false,
        navigateToStore: false,
        navigateToSearchResults: true
      })
    }

    addItemToGroceryList = (item) => {
      console.log("Adding item to shopping list")
      this.setState({
        grocery_list: [ ...this.state.grocery_list, item ]
      })
    }

    removeItemFromShoppingList = (name) => {
      console.log("Removing item from shopping list")
      const newGroceryList = this.state.grocery_list.filter(element => element.name !== name);
      this.setState({
        grocery_list : newGroceryList
      })
    }

    clearShoppingList = () => {
      console.log("Clearing shopping list")
      this.setState({
          grocery_list: []
      })
    }

    render() {
       return (
        <MDBContainer className="app-container text-center">

          <Header />
          {
            <MDBRow className="logo-container">
              <img className="image-concierge" src={this.state.conciergeImage} />
            </MDBRow>
          }

          <Router>
            <Switch>
              <Route path="/select-store">
                    <h2 className="store-selection-title">Stores nearby {this.state.postalCode}</h2>
                    {
                      (this.state.navigateToMap && !this.state.navigateToStore && !this.state.navigateToSearchResults) &&
                        <section className="google-map">
                          <GoogleMap onStoreSelection={this.onStoreSelection}/>
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
                          selectedPlace={this.state.selectedPlace}
                          navigateToMap={this.navigateToMap}
                          navigateToSearchResults={this.navigateToSearchResults}
                          addItemToGroceryList={this.addItemToGroceryList}
                          grocery_list={this.state.grocery_list}
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
                          grocery_list={this.state.grocery_list}
                          removeItemFromShoppingList={this.removeItemFromShoppingList}
                          clearShoppingList={this.clearShoppingList}
                          navigateToStore={this.navigateToStore}
                          selectedPlace={this.selectedPlace}
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