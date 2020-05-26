import React, {Fragment, useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from 'sweetalert2-react';

const ShoppingList = props =>  {
    const [show, setShow] = useState(false);
    if (props.groceryList.length === 0) {
        return (
            <Fragment>
                <div className="back-navigation">
                    <FontAwesomeIcon className="back-icon" icon="chevron-left"/>
                    <Link className="back-link" to={{
                        pathname: `/mobile/account`
                    }}>Back</Link>
                </div>
                <h3>Your shopping list is empty</h3>
            </Fragment>
        );
    }
    return (
        <Fragment>
            <div className="back-navigation">
                <FontAwesomeIcon className="back-icon" icon="chevron-left"/>
                <Link className="back-link" to={{
                    pathname: `/mobile/account`
                }}>Back</Link>
            </div>
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
        </Fragment>
      );
}

export default withRouter(ShoppingList);
