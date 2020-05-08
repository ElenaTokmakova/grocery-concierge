import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';
import Mobile from './mobile/App';
import Kiosk from './kiosk/App';
import Mode from './Mode';

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