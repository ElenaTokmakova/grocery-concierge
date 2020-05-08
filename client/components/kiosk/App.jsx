import React, { Fragment, useReducer, useEffect } from 'react';
//import Catch from "./utilities/functionalErrorBoundary.ts"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { MDBContainer } from "mdbreact";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltLeft, faMicrophone, faAngleRight, faMapMarkerAlt, faBox, faEgg, faFish, faToiletPaper, faScroll, faTrash, faHeart, faQuestion, faSignOutAlt, faCloudUploadAlt, faMobileAlt, faDesktop } from '@fortawesome/free-solid-svg-icons';
library.add(faLongArrowAltLeft, faMicrophone, faAngleRight, faMapMarkerAlt, faBox, faEgg, faFish, faToiletPaper, faScroll, faTrash, faHeart, faQuestion, faSignOutAlt, faCloudUploadAlt, faMobileAlt, faDesktop );


const App = () => {

    return (

        <div>Kiosk App Component</div>

    );
}

export default App;