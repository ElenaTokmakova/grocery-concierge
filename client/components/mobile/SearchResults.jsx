import React, {useState} from 'react';
import { Link, useRouteMatch, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShoppingList from './ShoppingList';
import SweetAlert from 'sweetalert2-react';
import grocery_store_aisle from "../../assets/images/grocery_store_aisle.png";

const SearchResults = props => {
    const [show, setShow] = useState(false);
    const match = useRouteMatch();
    const { productLocation, groceryList, removeItemFromShoppingList, clearShoppingList, goToStepOne, goToStepTwo } = props;
        return (
            <section className="search-results-section">
                <div className="search-results-location"><p className="font-weight-bold">{productLocation}</p></div>
                <MDBRow className="product-search-results">
                    <MDBCol md="12" lg="6">
                        <img className="image-grocery-aisle img-fluid" src={grocery_store_aisle} />
                    </MDBCol>
                    <MDBCol md="12" lg="6">
                        {
                        props.groceryList.length > 0 && <ShoppingList
                                groceryList={groceryList}
                                removeItemFromShoppingList={removeItemFromShoppingList}
                                clearShoppingList={clearShoppingList}
                            />
                        }
                    </MDBCol>
                </MDBRow>
                <MDBRow className="product-search-results--action-buttons">
                    <p className="font-weight-bold w-100">Would you like to</p>
                    <button className="search-results-button button button-orange-red"
                    aria-haspopup="true" aria-expanded={state.show} onClick={ () => setShow(true)}>
                        <FontAwesomeIcon className="fa-icon" icon="heart"/> Save this Map
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
                    }} onClick={goToStepTwo}>
                        <button className="search-results-button button button-orange-red">
                        <FontAwesomeIcon className="fa-icon" icon="question"/> Ask another question
                        </button>
                    </Link>
                    <Link to={{
                        pathname: `/mobile/select-store`
                    }} onClick={goToStepOne}>
                        <button className="search-results-button button button-orange-red">
                            <FontAwesomeIcon className="fa-icon" icon="sign-out-alt"/> Exit the store
                        </button>
                    </Link>
                </MDBRow>
            </section>
        )
}

export default withRouter(SearchResults);