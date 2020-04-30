import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import ShoppingList from './ShoppingList';
import SweetAlert from 'sweetalert2-react';
import grocery_store_isle from "../assets/images/grocery_store_isle.png";

const SearchResults = props => {
    const { selectedPlace, productLocation, groceryList, removeItemFromShoppingList, clearShoppingList, navigateToStore } = props;
    console.log("Props", props)
    return (
        <Fragment>
            <div><p className="font-weight-bold">{productLocation}</p></div>
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
                <MDBBtn className="back-to-search-button btn-orange-red">
                    Save this Map
                </MDBBtn>
                <Link to={{
                    pathname: '/select-products',
                    state: {selectedPlace}
                }} onClick={navigateToStore}>
                    <MDBBtn className="back-to-search-button btn-lighter-green">
                        Ask another question
                    </MDBBtn>
                </Link>
            </MDBRow>
        </Fragment>
    )
}

export default withRouter(SearchResults);