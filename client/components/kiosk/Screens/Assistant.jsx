import React, { Fragment, useContext } from 'react';
import KioskContext from '../Context';
import { MDBRow, MDBCol } from 'mdbreact';
import NavigationLink from './components/NavigationLink';


const Assistant = () => {

    const { concierge, customer } = useContext(KioskContext);

    return (
        <Fragment>
            <section className="screen-section screen-sections-assistant">
                <MDBRow>
                    <MDBCol md="10" className="text-container align-items-end">
                        <h3 className="customer-speaking">Call for assistance.</h3>
                    </MDBCol>
                    <MDBCol md="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={customer} alt="Grocery Concierge icon"/>
                    </MDBCol>
               </MDBRow>
               <MDBRow>
                    <MDBCol md="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={concierge} alt="Grocery Concierge icon"/>
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
                <NavigationLink pathname='/kiosk/actions' buttonText='Previous Screen'/>
                <NavigationLink pathname='/kiosk/exit' buttonText='Next Screen'/>
            </section>
        </Fragment>
    )
}

export default Assistant;