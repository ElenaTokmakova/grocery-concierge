import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import ShoppingList from './ShoppingList';
import SweetAlert from 'sweetalert2-react';
import grocery_store_isle from "../assets/images/grocery_store_isle.png";

const SearchResults = props => {
    const { selectedPlace } = props;
    return (
        <Fragment>
            <MDBRow className="product-search-results">
                <MDBCol md="12" lg="6">
                    <img className="image-grocery-isle img-fluid" src={grocery_store_isle} />
                </MDBCol>
                <MDBCol md="12" lg="6">
                    {
                    props.grocery_list.length > 0 && <ShoppingList
                        grocery_list={props.grocery_list}
                        removeItemFromShoppingList={props.removeItemFromShoppingList}
                        clearShoppingList={props.clearShoppingList}
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
                }} onClick={props.navigateToStore}>
                    <MDBBtn className="back-to-search-button btn-light-green">
                        Ask another question
                    </MDBBtn>
                </Link>
            </MDBRow>
        </Fragment>
    )
}

export default withRouter(SearchResults);