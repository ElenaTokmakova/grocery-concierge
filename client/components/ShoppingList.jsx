import React, {Fragment, useState} from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from 'sweetalert2-react';

const ShoppingList = props =>  {
    const [show, setShow] = useState(false);
    return (
        <Fragment>
            <p className="product-search-subtitle font-weight-bold">Your shopping list</p>
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
                    <MDBBtn className="back-to-product-search-button btn-orange-red" onClick={ () => setShow(true)}>Save shopping list</MDBBtn>
                    <SweetAlert
                        type="success"
                        confirmButtonColor="#a1bf63"
                        show={show}
                        title="Success"
                        text="Your shopping list has been saved!"
                        onConfirm={() => setShow(false)}
                    />
                    <MDBBtn className="back-to-product-search-button btn-lighter-green" onClick={props.clearShoppingList}>Clear shopping list</MDBBtn>
                </Fragment>
            }
        </Fragment>
      );
}

export default ShoppingList;
