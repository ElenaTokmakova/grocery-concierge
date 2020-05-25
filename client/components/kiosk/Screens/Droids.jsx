import React, { Fragment, useContext } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import KioskContext from '../Context';
import NavigationLink from './components/NavigationLink';
import droids from "../../../assets/images/droids.jpg";


const Droids = () => {

    const { concierge } = useContext(KioskContext);

    return (
        <Fragment>
            <section className="screen-section screen-section-found">
                <MDBRow>
                    <MDBCol md="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={concierge} alt="Grocery Concierge icon"/>
                    </MDBCol>
                    <MDBCol md="10" className="text-container">
                        <h3 className="concierge-speaking">I can't find the droids you're looking for.</h3>
                    </MDBCol>
               </MDBRow>
               <MDBRow>
                    <MDBCol md="12" className="concierge-directions-container justify-content-center">
                        <img src={droids} className="img-fluid" alt="Droids"/>
                    </MDBCol>
               </MDBRow>
            </section>
            <section className="screen-navigation-links">
                <NavigationLink pathname='/kiosk/looking' buttonText='Previous Screen'/>
                <NavigationLink pathname='/kiosk/actions' buttonText='Next Screen'/>
            </section>
        </Fragment>
    )
}

export default Droids;