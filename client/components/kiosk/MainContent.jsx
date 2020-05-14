import React, { Fragment  } from 'react';
import { Route, useRouteMatch, Redirect } from 'react-router-dom';
import Welcome from './Screens/Welcome';
import Looking from './Screens/Looking';
import Found from './Screens/Found';
import Actions from './Screens/Actions';
import Assistant from './Screens/Assistant';
import Exit from './Screens/Exit';


const MainContent = (props) => {

    const match = useRouteMatch();

    return (
        <Fragment>
            <Route path={`${match.url}/welcome`} >
                <Welcome />
            </Route>
            <Route path={`${match.url}/looking`} >
                <Looking />
            </Route>
            <Route path={`${match.url}/found`} >
                <Found />
            </Route>
            <Route path={`${match.url}/actions`} >
                <Actions />
            </Route>
            <Route path={`${match.url}/assistant`} >
                <Assistant />
            </Route>
            <Route path={`${match.url}/exit`} >
                <Exit />
            </Route>
            <Route exact path="/kiosk">
                <Redirect to={`${match.url}/welcome`} />
            </Route>
        </Fragment>
    )
}

export default MainContent;