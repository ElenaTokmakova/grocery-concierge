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
import conciergeImage from "../assets/images/concierge.jpg";

class App extends Component {

    state = {
      conciergeImage : conciergeImage,
      selectedPlace: {},
      navigateToStore: false,
      postalCode: 'you'
    };

    onStoreSelection = (selectedPlace) => {
      this.setState({
        navigateToStore: true,
        selectedPlace
      }, () => {
        // console.log("State: ", this.state)
      });
    }

    navigateToMap = () => {
      this.setState({
        navigateToStore: false,
        selectedPlace: {}
      })
    }

    render() {
      return (
        <MDBContainer className="app-container text-center">

          <Header />

          <MDBRow className="logo-container">
            <img className="image-concierge" src={this.state.conciergeImage} />
          </MDBRow>

          <Router>
            <Switch>
              <Route path="/select-store">
              <h2 className="store-selection-title">Stores nearby {this.state.postalCode}</h2>
              {
                this.state.navigateToStore === false &&
                <section className="google-map">
                  <GoogleMap onStoreSelection={this.onStoreSelection}/>
                </section>
              }
              {
                this.state.navigateToStore === true &&
                <Redirect to="/select-products" store={this.state.selectedPlace}/>
              }
              </Route>
              <Route path="/select-products" store={this.state.selectedPlace}>
                {
                  this.state.navigateToStore === true &&
                  <ProductSearch selectedPlace={this.state.selectedPlace} navigateToMap={this.navigateToMap}/>
                }
                {
                this.state.navigateToStore === false &&
                  <Redirect to="/select-store"/>
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