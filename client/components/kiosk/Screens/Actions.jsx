import React, { Fragment, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import KioskContext from '../Context';
import { MDBRow, MDBCol } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavigationLink from './components/NavigationLink';

const Action = () => {

    const { concierge } = useContext(KioskContext);

    return (
        <Fragment>
            <section className="screen-section screen-section-actions">
                <MDBRow>
                    <MDBCol md="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={concierge} alt="Grocery Concierge icon"/>
                    </MDBCol>
                    <MDBCol md="10" className="text-container">
                        <h3 className="concierge-speaking">Would you like to</h3>
                    </MDBCol>
               </MDBRow>
               <MDBRow>
                    <MDBCol lg="10" md="12" className="offset-lg-2 offset-md-0 concierge-action-buttons-container">
                        <div className="kiosk-action-button-container">
                            <Link to={{
                                pathname: `/kiosk/actions`
                            }} >
                                <button className="kiosk-action-button button button-orange-red">
                                <FontAwesomeIcon className="fa-icon" icon="print"/> Print this Map
                                </button>
                            </Link>
                            <Link to={{
                                pathname: `/kiosk/actions`
                            }} >
                                <button className="kiosk-action-button button button-orange-red">
                                    <FontAwesomeIcon className="fa-icon" icon="phone-volume"/> Call for Assistance
                                </button>
                            </Link>
                        </div>
                        <div className="kiosk-action-button-container">
                            <Link to={{
                                pathname: `/kiosk/looking`
                            }} >
                                <button className="kiosk-action-button button button-orange-red">
                                    <FontAwesomeIcon className="fa-icon" icon="question"/> Ask another question
                                </button>
                            </Link>
                            <Link to={{
                                pathname: `/kiosk/welcome`
                            }} >
                                <button className="kiosk-action-button button button-orange-red">
                                    <FontAwesomeIcon className="fa-icon" icon="sign-out-alt"/> Exit Application
                                </button>
                            </Link>
                        </div>
                    </MDBCol>
               </MDBRow>
            </section>
            <section className="screen-navigation-links">
                <NavigationLink pathname='/kiosk/found' buttonText='Previous Screen'/>
                <NavigationLink pathname='/kiosk/assistant' buttonText='Next Screen'/>
            </section>
        </Fragment>
    )
}

export default withRouter(Action);