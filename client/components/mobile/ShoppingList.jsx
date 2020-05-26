import React, {Fragment, useState} from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from 'sweetalert2-react';
import NavigateBack from './components/NavigateBack';

const ShoppingList = props =>  {
    const [show, setShow] = useState(false);
    if (props.groceryList.length === 0) {
        return (
            <Fragment>
                <NavigateBack pathname="/mobile/account" text="Back"/>
                <h3>Your shopping list is empty</h3>
            </Fragment>
        );
    }
    return (
        <section className="mobile-section mobile-section-shopping-list">
            <NavigateBack pathname="/mobile/account" text="Back"/>
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
                            <td><FontAwesomeIcon onClick={ () => { props.removeItemFromShoppingList(name)}} icon="trash" className="clear-shopping-list-icon"/></td>
                            </tr>
                        )
                    })
                }
            </MDBTableBody>
            </MDBTable>
            <div className="shopping-list-buttons-container action-buttons">
                <button className="search-results-button button button-lighter-green"
                aria-haspopup="true" aria-expanded={show} onClick={ () => setShow(true)}>
                    <FontAwesomeIcon className="fa-icon" icon="cloud-upload-alt"/> Save shopping list
                </button>
                <SweetAlert
                    type="success"
                    confirmButtonColor="#a1bf63"
                    show={show}
                    title="Success"
                    text="Your shopping list has been saved!"
                    onConfirm={() => setShow(false)}
                />
                <button className="search-results-button button button-lighter-green" onClick={props.clearShoppingList}>
                    <FontAwesomeIcon className="fa-icon" icon="trash"/>  Clear shopping list
                </button>
            </div>
        </section>
      );
}

export default ShoppingList;
