import React, {Fragment, Component} from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from 'sweetalert2-react';

class ShoppingList extends Component {
    state = {
        show: false
    }
    render () {
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
                        this.props.groceryList.map( (product, index) => {
                            const { name, location } = product;
                            return (
                                <tr key={index}>
                                <td>{name}</td>
                                <td>{location}</td>
                                <td><FontAwesomeIcon onClick={this.props.removeItemFromShoppingList.bind(this, name)} icon="trash" className="clear-shopping-list-icon"/></td>
                                </tr>
                            )
                        })
                    }
                </MDBTableBody>
                </MDBTable>
                {
                    this.props.groceryList.length > 0 &&
                    <Fragment>
                        <MDBBtn className="back-to-product-search-button btn-orange-red" onClick={ () => this.setState({ show:true })}>Save shopping list</MDBBtn>
                        <SweetAlert
                            type="success"
                            confirmButtonColor="#a1bf63"
                            show={this.state.show}
                            title="Success"
                            text="Your shopping list has been saved!"
                            onConfirm={() => this.setState({ show: false })}
                        />
                        <MDBBtn className="back-to-product-search-button btn-lighter-green" onClick={this.props.clearShoppingList}>Clear shopping list</MDBBtn>
                    </Fragment>
                }
            </Fragment>
          );
    }
}

export default ShoppingList;
