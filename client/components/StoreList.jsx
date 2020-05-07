import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBListGroup, MDBListGroupItem } from "mdbreact";

const StoreList = props => {

    return (
        <MDBListGroup className="grocery-stores">
            {
                props.stores.map((store, index) => {
                    const {name, id, vicinity} = store;
                    const map_link = `https://www.google.com/maps/search/?api=1&query_place_id=${id}&query=${vicinity}`;
                    return (
                        <MDBListGroupItem key={index} className="grocery-stores--store-wrapper">
                            <div className="grocery-stores--store">
                                <div className="grocery-stores--store-info">
                                    <span className="grocery-stores--store-name">{name}</span>
                                    <span className="grocery-stores--store-address">{vicinity}</span>
                                    <span className="grocery-stores--google-map"><a href={map_link} target="_blank">Open Google Maps</a></span>
                                </div>
                                <Link to={{
                                    pathname: '/select-products'
                                }} onClick={() => props.onStoreSelection(store)} >
                                    <button className="grocery-stores--store-selection-button button button-lighter-green" >
                                        Select this store
                                    </button>
                                </Link>
                            </div>
                        </MDBListGroupItem>
                    )
                })
            }
        </MDBListGroup>
    )
}

export default withRouter(StoreList);