import React, { Component, Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';
import { PushSpinner } from "react-spinners-kit";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltLeft, faMicrophone, faAngleRight, faMapMarkerAlt, faBox, faEgg, faFish, faToiletPaper, faScroll, faTrash, faHeart, faQuestion, faSignOutAlt, faCloudUploadAlt, faMobileAlt, faDesktop, faDotCircle, faPrint, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
library.add(faLongArrowAltLeft, faMicrophone, faAngleRight, faMapMarkerAlt, faBox, faEgg, faFish, faToiletPaper, faScroll, faTrash, faHeart, faQuestion, faSignOutAlt, faCloudUploadAlt, faMobileAlt, faDesktop, faDotCircle, faPrint, faPhoneVolume );

const Mobile = lazy(() => import('./mobile/App'));
const Kiosk = lazy(() => import('./kiosk/App'));
const Mode = lazy(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve(import("./Mode")), 1000);
    });
  });

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
      }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log("Error", error, "Error info", errorInfo);
    }

    render() {
        if (this.state.hasError) {
          // You can render any custom fallback UI
          return (
            <div className="full-screen full-screen-mode">
                <h1>Something went wrong.</h1>;
            </div>
          )
        }

        return (
            <Router>
                <Suspense fallback={
                    <div className="full-screen full-screen-mode">
                         <PushSpinner size={100} color="#a1bf63" />
                    </div>
                    }>
                    <Switch>
                        <Route path='/mobile' component={Mobile} />
                        <Route path='/kiosk' component={Kiosk} />
                        <Route exact path='/' component={Mode} />
                    </Switch>
                </Suspense>
            </Router>
        )
    }

}