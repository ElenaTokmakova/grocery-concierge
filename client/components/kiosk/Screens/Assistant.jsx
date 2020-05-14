import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdbreact';


const Assistant = (props) => {

    return (
        <Fragment>
            <section className="screen-section screen-sections-assistant">
                <MDBRow>
                    <MDBCol md="10" className="text-container align-items-end">
                        <h3 className="customer-speaking">Call for assistance.</h3>
                    </MDBCol>
                    <MDBCol md="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={props.customer} alt="Grocery Concierge icon"/>
                    </MDBCol>
               </MDBRow>
               <MDBRow>
                    <MDBCol md="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={props.concierge} alt="Grocery Concierge icon"/>
                    </MDBCol>
                    <MDBCol md="10" className="text-container">
                        <h3 className="concierge-speaking">Ok, I will call an assistant for you. <br/>Someone will be with you shortly.</h3>
                    </MDBCol>
               </MDBRow>
               <MDBRow className="session-ended-container">
                    <MDBCol md="4">
                        <hr/>
                    </MDBCol>
                    <MDBCol md="4" className="text-center">
                        <span>The session has ended</span>
                    </MDBCol>
                    <MDBCol md="4">
                        <hr/>
                    </MDBCol>
               </MDBRow>
            </section>
            <section className="screen-navigation-links">
                <Link to={{
                    pathname: `/kiosk/actions`
                }}>
                    <button className="grocery-stores--store-selection-button button button-lighter-green" >
                        Previous Screen
                    </button>
                </Link>
                <Link to={{
                    pathname: `/kiosk/exit`
                }}>
                    <button className="grocery-stores--store-selection-button button button-lighter-green" >
                        Next Screen
                    </button>
                </Link>
            </section>
        </Fragment>
    )
}

export default withRouter(Assistant);