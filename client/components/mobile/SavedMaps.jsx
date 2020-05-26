import React, { Fragment } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import grocery_store_aisle from "../../assets/images/grocery_store_aisle_small.png";
import NavigateBack from './components/NavigateBack';

const SavedMaps = (props) => {

    return (

        <section className="mobile-section mobile-section-saved-maps">
            <NavigateBack pathname="/mobile/account" text="Back"/>
            <MDBRow>
                <MDBCol md="6" className="offset-md-3 concierge-action-buttons-container mb-4">
                    <img className="img-fluid" src={grocery_store_aisle} alt="Grocery aisle picture"/>
                </MDBCol>
            </MDBRow>
        </section>
    )
}

export default SavedMaps;