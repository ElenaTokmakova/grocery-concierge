import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Action = (props) => {

    return (
        <Fragment>
            <section className="screen-section screen-section-actions">
                <MDBRow>
                    <MDBCol md="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={props.concierge} alt="Grocery Concierge icon"/>
                    </MDBCol>
                    <MDBCol md="10" className="text-container">
                        <h3 className="concierge-speaking">Would you like to</h3>
                    </MDBCol>
               </MDBRow>
               <MDBRow>
                    <MDBCol lg="10" md="12" className="offset-lg-2 offset-md-0 concierge-action-buttons-container">
                        <div className="kiosk-action-button-container">
                            <Link to={{
                                pathname: `/mobile/select-products`
                            }} >
                                <button className="kiosk-action-button button button-orange-red">
                                <FontAwesomeIcon className="fa-icon" icon="print"/> Print this Map
                                </button>
                            </Link>
                            <Link to={{
                                pathname: `/mobile/select-store`
                            }} >
                                <button className="kiosk-action-button button button-orange-red">
                                    <FontAwesomeIcon className="fa-icon" icon="phone-volume"/> Call for Assistance
                                </button>
                            </Link>
                        </div>
                        <div className="kiosk-action-button-container">
                            <Link to={{
                                pathname: `/mobile/select-products`
                            }} >
                                <button className="kiosk-action-button button button-orange-red">
                                <FontAwesomeIcon className="fa-icon" icon="question"/> Ask another question
                                </button>
                            </Link>
                            <Link to={{
                                pathname: `/mobile/select-store`
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
                <Link to={{
                    pathname: `/kiosk/found`
                }}>
                    <button className="grocery-stores--store-selection-button button button-lighter-green" >
                        Previous Screen
                    </button>
                </Link>
                <Link to={{
                    pathname: `/kiosk/assistant`
                }}>
                    <button className="grocery-stores--store-selection-button button button-lighter-green" >
                        Next Screen
                    </button>
                </Link>
            </section>
        </Fragment>
    )
}

export default withRouter(Action);