import React, {Fragment, useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import ShoppingList from './ShoppingList';
import SweetAlert from 'sweetalert2-react';
import grocery_store_isle from "../assets/images/grocery_store_isle.png";

const SearchResults = props => {
    const [show, setShow] = useState(false);
    const { productLocation, groceryList, removeItemFromShoppingList, clearShoppingList, goToStepOne, goToStepTwo } = props;
        return (
            <Fragment>
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
                    <MDBBtn className="back-to-search-button btn-orange-red" onClick={ () => setShow(true)}>
                        Save this Map
                    </MDBBtn>
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
                        <MDBBtn className="back-to-search-button btn-lighter-green">
                            Ask another question
                        </MDBBtn>
                    </Link>
                    <Link to={{
                        pathname: '/select-store'
                    }} onClick={goToStepOne}>
                        <MDBBtn className="back-to-search-button btn-orange-red">
                            Exit the store
                        </MDBBtn>
                    </Link>
                </MDBRow>
            </Fragment>
        )
}

export default withRouter(SearchResults);