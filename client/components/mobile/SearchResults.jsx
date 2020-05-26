import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MobileContext from './Context';
import SweetAlert from 'sweetalert2-react';
import grocery_store_aisle from "../../assets/images/grocery_store_aisle_small.png";

const SearchResults = props => {
    const [show, setShow] = useState(false);
    const { concierge } = useContext(MobileContext);
    const { productLocation } = props;
        return (
            <section className="search-results-section">
                <div className="conversation-container conversation-container--concierge search-results-location">
                    <img className="grocery-concierge-icon" src={concierge} alt="Grocery Concierge icon"/>
                    <span><strong>{productLocation}</strong></span>
                </div>
                <MDBRow className="product-search-results">
                    <MDBCol lg="6" className="aisle-image-container offset-lg-3">
                        <img className="image-grocery-aisle img-fluid" src={grocery_store_aisle} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol className="product-search-results--action-buttons-container">
                        <p className="font-weight-bold w-100">Would you like to:</p>
                        <div className="product-search-results--action-buttons action-buttons">
                            <button className="search-results-button button button-orange-red"
                            aria-haspopup="true" aria-expanded={show} onClick={ () => setShow(true)}>
                                <FontAwesomeIcon className="fa-icon" icon="heart"/> Save this map
                            </button>
                            <SweetAlert
                                type="success"
                                confirmButtonColor="#a1bf63"
                                show={show}
                                title="Success"
                                text="Your map has been saved!"
                                onConfirm={() => setShow(false)}
                            />
                            <Link to={{
                                pathname: `/mobile/select-products`
                            }}>
                                <button className="search-results-button button button-orange-red">
                                    <FontAwesomeIcon className="fa-icon" icon="question"/> Ask another question
                                </button>
                            </Link>
                            <Link to={{
                                pathname: `/mobile/select-store`
                            }}>
                                <button className="search-results-button button button-orange-red">
                                    <FontAwesomeIcon className="fa-icon" icon="sign-out-alt"/> Exit the store
                                </button>
                            </Link>
                        </div>
                    </MDBCol>
                </MDBRow>
            </section>
        )
}

export default withRouter(SearchResults);