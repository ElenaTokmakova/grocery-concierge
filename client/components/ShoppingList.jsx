import React, {Fragment} from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShoppingList = props => {

    return (
        <Fragment>
            <p className="product-search-subtitle">Your shopping list</p>
            <MDBTable className="shopping-list-table" striped bordered responsive hover>
                <MDBTableHead>
                <tr>
                    <th>Product</th>
                    <th>Location</th>
                    <th>Remove</th>
                </tr>
                </MDBTableHead>
                <MDBTableBody>
                {
                    props.groceryList.map( (product, index) => {
                        const { name, location } = product;
                        return (
                            <tr key={index}>
                            <td>{name}</td>
                            <td>{location}</td>
                            <td><FontAwesomeIcon onClick={props.removeItemFromShoppingList.bind(this, name)} icon="trash" className="clear-shopping-list-icon"/></td>
                            </tr>
                        )
                    })
                }
            </MDBTableBody>
            </MDBTable>
            {
                props.groceryList.length > 0 &&
                <Fragment>
                    <MDBBtn className="back-to-product-search-button btn-orange-red">Save shopping list</MDBBtn>
                    <MDBBtn className="back-to-product-search-button btn-lighter-green" onClick={props.clearShoppingList}>Clear shopping list</MDBBtn>
                </Fragment>
            }
        </Fragment>
      );
}

export default ShoppingList;
