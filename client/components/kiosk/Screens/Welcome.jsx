import React, { Fragment, useContext } from 'react';
import KioskContext from '../Context';
import { MDBRow, MDBCol } from "mdbreact";
import NavigationLink from './components/NavigationLink';

const Welcome = (props) => {

    const { concierge } = useContext(KioskContext);

    return (
        <Fragment>
            <section className="screen-section screen-section-welcome">
               <MDBRow>
                <MDBCol md="2" className="circle-container">
                    {/* <div className="circle">
                        <span>AI</span>
                    </div> */}
                    <img className="grocery-concierge-icon" src={concierge} alt="Grocery Concierge icon"/>
                </MDBCol>
                <MDBCol md="10" className="text-container">
                    <h2>Welcome to Grocery Concierge.</h2>
                    <p>We can help you find what you are looking for in this store.</p>
                    <p>Say <strong>"Ask a question"</strong> to continue.</p>
                </MDBCol>
               </MDBRow>
            </section>
            <section className="screen-navigation-links">
                <NavigationLink pathname='/kiosk/looking' buttonText='Next Screen'/>
            </section>
        </Fragment>
    )
}

export default Welcome;