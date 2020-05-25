import React, { Fragment, useContext } from 'react';
import KioskContext from '../Context';
import { MDBRow, MDBCol } from 'mdbreact';
import NavigationLink from './components/NavigationLink';

const Looking = (props) => {

    let customerUtterance = '';

    if (props.intent === 'where' && props.outputYou) {
        customerUtterance = props.outputYou;
    }

    const { concierge, customer } = useContext(KioskContext);

    return (
        <Fragment>
            <section className="screen-section screen-section-looking">
               <MDBRow>
                    <MDBCol md="10" className="text-container align-items-end">
                        <h3 className="customer-speaking">I'm looking for something</h3>
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
                        <h3 className="concierge-speaking">What are you looking for?</h3>
                    </MDBCol>
               </MDBRow>
               <MDBRow>
                    <MDBCol md="10" className="text-container align-items-end">
                        <h3 className="customer-speaking">{customerUtterance}</h3>
                    </MDBCol>
                    <MDBCol md="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={customer} alt="Grocery Concierge icon"/>
                    </MDBCol>
               </MDBRow>
            </section>
            <section className="screen-navigation-links">
                <NavigationLink pathname='/kiosk/welcome' buttonText='Previous Screen'/>
                <NavigationLink pathname='/kiosk/found' buttonText='Next Screen'/>
            </section>
        </Fragment>
    )
}

export default Looking;