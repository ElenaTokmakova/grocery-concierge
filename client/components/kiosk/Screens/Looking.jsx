import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdbreact';

const Looking = (props) => {

    return (
        <Fragment>
            <section className="screen-section screen-section-looking">
               <MDBRow>
                    <MDBCol md="10" className="text-container align-items-end">
                        <h3 className="customer-speaking">I'm looking for something</h3>
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
                        <h3 className="concierge-speaking">What are you looking for?</h3>
                    </MDBCol>
               </MDBRow>
               <MDBRow>
                    <MDBCol md="10" className="text-container align-items-end">
                        <h3 className="customer-speaking">Where can I find beans?</h3>
                    </MDBCol>
                    <MDBCol md="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={props.customer} alt="Grocery Concierge icon"/>
                    </MDBCol>
               </MDBRow>
            </section>
            <section className="screen-navigation-links">
                <Link to={{
                    pathname: `/kiosk/welcome`
                }}>
                    <button className="grocery-stores--store-selection-button button button-lighter-green" >
                        Previous Screen
                    </button>
                </Link>
                <Link to={{
                    pathname: `/kiosk/found`
                }}>
                    <button className="grocery-stores--store-selection-button button button-lighter-green" >
                        Next Screen
                    </button>
                </Link>
            </section>
        </Fragment>
    )
}

export default withRouter(Looking);