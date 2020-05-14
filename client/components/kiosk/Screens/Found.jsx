import React, { Fragment, useContext } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import KioskContext from '../Context';
import NavigationLink from './components/NavigationLink';
import grocery_store_aisle_small from "../../../assets/images/grocery_store_aisle_small.png";


const Found = () => {

    const { concierge } = useContext(KioskContext);

    return (
        <Fragment>
            <section className="screen-section screen-section-found">
                <MDBRow>
                    <MDBCol md="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={concierge} alt="Grocery Concierge icon"/>
                    </MDBCol>
                    <MDBCol md="10" className="text-container">
                        <h3 className="concierge-speaking">Beans are in Aisle 3.</h3>
                    </MDBCol>
               </MDBRow>
               <MDBRow>
                    <MDBCol lg="10" md="12" className="offset-lg-2 offset-md-0 concierge-directions-container">
                        <img src={grocery_store_aisle_small} className="img-fluid" alt="Grocery store aisle"/>
                        <h3 className="concierge-directions">Walk left to find Aisle 3.</h3>
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

export default Found;