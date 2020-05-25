import React, { Fragment  } from 'react';
import { Route, useRouteMatch, Redirect } from 'react-router-dom';
import Welcome from './Screens/Welcome';
import Looking from './Screens/Looking';
import Found from './Screens/Found';
import Actions from './Screens/Actions';
import Assistant from './Screens/Assistant';
import Exit from './Screens/Exit';
import Droids from './Screens/Droids';

const MainContent = (props) => {

    const match = useRouteMatch();

    return (
        <Fragment>
            {
                props.intent === 'start' && <Redirect to={`${match.url}/welcome`} />
            }
            {
                props.intent === 'question' && <Redirect to={`${match.url}/looking`} />
            }
            {
                props.intent === 'help' && <Redirect to={`${match.url}/assistant`} />
            }
            {
                props.intent === 'actions' && <Redirect to={`${match.url}/actions`} />
            }
            {
                props.intent === 'exit' && <Redirect to={`${match.url}/exit`} />
            }
            {
                props.intent === 'droids' && <Redirect to={`${match.url}/droids`} />
            }
            {
                (props.intent === 'where' && !props.speaking) && <Redirect to={`${match.url}/found`} />
            }
            <Route path={`${match.url}/welcome`} >
                <Welcome />
            </Route>
            <Route path={`${match.url}/looking`} >
                <Looking {...props } />
            </Route>
            <Route path={`${match.url}/found`}>
                <Found { ...props } />
            </Route>
            <Route path={`${match.url}/actions`} >
                <Actions { ...props } />
            </Route>
            <Route path={`${match.url}/assistant`} >
                <Assistant />
            </Route>
            <Route path={`${match.url}/exit`} >
                <Exit />
            </Route>
            <Route path={`${match.url}/droids`} >
                <Droids />
            </Route>
            <Route exact path="/kiosk">
                <Redirect to={`${match.url}/welcome`} />
            </Route>
        </Fragment>
    )
}

export default MainContent;