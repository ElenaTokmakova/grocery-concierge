import React, { Fragment } from 'react';
import { Route, useRouteMatch, Redirect } from 'react-router-dom';
import Welcome from './Screens/Welcome';
import Looking from './Screens/Looking';
import Found from './Screens/Found';
import Actions from './Screens/Actions';
import Assistant from './Screens/Assistant';
import Exit from './Screens/Exit';
import concierge from '../../assets/images/concierge.svg';
import customer from '../../assets/images/customer.svg';

const MainContent = () => {

    const match = useRouteMatch();

    return (
        <Fragment>
            <Route path={`${match.url}/welcome`} >
                <Welcome concierge={concierge}/>
            </Route>
            <Route path={`${match.url}/looking`} >
                <Looking concierge={concierge} customer={customer}/>
            </Route>
            <Route path={`${match.url}/found`} >
                <Found concierge={concierge}/>
            </Route>
            <Route path={`${match.url}/actions`} >
                <Actions concierge={concierge}/>
            </Route>
            <Route path={`${match.url}/assistant`} >
                <Assistant concierge={concierge} customer={customer}/>
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