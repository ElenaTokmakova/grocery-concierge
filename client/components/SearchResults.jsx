import React, {useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol } from "mdbreact";
import ShoppingList from './ShoppingList';
import SweetAlert from 'sweetalert2-react';
import grocery_store_isle from "../assets/images/grocery_store_isle.png";

const SearchResults = props => {
    const [show, setShow] = useState(false);
    const { productLocation, groceryList, removeItemFromShoppingList, clearShoppingList, goToStepOne, goToStepTwo } = props;
        return (
            <section className="search-results-section">
                <div className="search-results-location"><p className="font-weight-bold">{productLocation}</p></div>
                <MDBRow className="product-search-results">
                    <MDBCol md="12" lg="6">
                        <img className="image-grocery-isle img-fluid" src={grocery_store_isle} />
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
                    <button className="search-results-button button button-orange-red" onClick={ () => setShow(true)}>
                        Save this Map
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
                        pathname: '/select-products'
                    }} onClick={goToStepTwo}>
                        <button className="search-results-button button button-lighter-green">
                            Ask another question
                        </button>
                    </Link>
                    <Link to={{
                        pathname: '/select-store'
                    }} onClick={goToStepOne}>
                        <button className="search-results-button button button-orange-red">
                            Exit the store
                        </button>
                    </Link>
                </MDBRow>
            </section>
        )
}

export default withRouter(SearchResults);