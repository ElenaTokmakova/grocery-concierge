import React, { Fragment } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import grocery_store_aisle from "../../assets/images/grocery_store_aisle_small.png";
import { Link, withRouter } from 'react-router-dom';

const SavedMaps = (props) => {

    return (

        <Fragment>
            <Fragment>
                <div className="back-navigation">
                    <FontAwesomeIcon className="back-icon" icon="chevron-left"/>
                    <Link className="back-link" to={{
                        pathname: `/mobile/account`
                    }}>Back</Link>
                </div>
            </Fragment>
            <MDBRow>
                <MDBCol md="6" className="offset-md-3 concierge-action-buttons-container mb-4">
                    <img className="img-fluid" src={grocery_store_aisle} alt="Grocery aisle picture"/>
                </MDBCol>
            </MDBRow>
        </Fragment>
    )
}

export default withRouter(SavedMaps);