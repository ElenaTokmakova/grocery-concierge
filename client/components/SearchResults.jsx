import React, {Component, Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import ShoppingList from './ShoppingList';
import SweetAlert from 'sweetalert2-react';
import grocery_store_isle from "../assets/images/grocery_store_isle.png";

class SearchResults extends Component {
    state = {
        show: false
    }
    render () {
        const { selectedPlace, productLocation, groceryList, removeItemFromShoppingList, clearShoppingList, navigateToStore } = this.props;
        return (
            <Fragment>
                <div><p className="font-weight-bold">{productLocation}</p></div>
                <MDBRow className="product-search-results">
                    <MDBCol md="12" lg="6">
                        <img className="image-grocery-isle img-fluid" src={grocery_store_isle} />
                    </MDBCol>
                    <MDBCol md="12" lg="6">
                        {
                        this.props.groceryList.length > 0 && <ShoppingList
                            groceryList={groceryList}
                            removeItemFromShoppingList={removeItemFromShoppingList}
                            clearShoppingList={clearShoppingList}
                            />
                        }
                    </MDBCol>
                </MDBRow>
                <MDBRow className="product-search-results--action-buttons">
                    <MDBBtn className="back-to-search-button btn-orange-red" onClick={ () => this.setState({ show:true })}>
                        Save this Map
                    </MDBBtn>
                    <SweetAlert
                        type="success"
                        confirmButtonColor="#a1bf63"
                        show={this.state.show}
                        title="Success"
                        text="Your map has been saved!"
                        onConfirm={() => this.setState({ show: false })}
                    />
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
}

export default withRouter(SearchResults);