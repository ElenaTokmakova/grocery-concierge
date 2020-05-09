import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';
import Mobile from './mobile/App';
import Kiosk from './kiosk/App';
import Mode from './Mode';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltLeft, faMicrophone, faAngleRight, faMapMarkerAlt, faBox, faEgg, faFish, faToiletPaper, faScroll, faTrash, faHeart, faQuestion, faSignOutAlt, faCloudUploadAlt, faMobileAlt, faDesktop } from '@fortawesome/free-solid-svg-icons';
library.add(faLongArrowAltLeft, faMicrophone, faAngleRight, faMapMarkerAlt, faBox, faEgg, faFish, faToiletPaper, faScroll, faTrash, faHeart, faQuestion, faSignOutAlt, faCloudUploadAlt, faMobileAlt, faDesktop );

const App = () => {

    return (
        <Router>
            <Switch>
                <Route path='/mobile' component={Mobile} />
                <Route path='/kiosk' component={Kiosk} />
                <Route exact path='/' component={Mode} />
            </Switch>
        </Router>
    )
}

export default App;