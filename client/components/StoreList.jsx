import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBBtn } from "mdbreact";

const StoreList = props => {

    return (
        <MDBListGroup className="grocery-stores">
            {
                props.stores.map((store, index) => {
                    const {name, id, vicinity, geometry} = store;
                    let isOpen = '';
                    if (store.opening_hours) {
                        isOpen = store.opening_hours.open_now ? 'Open' : 'Closed';
                    }
                    const map_link = `https://www.google.com/maps/search/?api=1&query_place_id=${id}&query=${vicinity}`;
                    return (
                        <MDBListGroupItem key={index} className="grocery-stores--store-wrapper">
                            <div className="grocery-stores--store">
                                <div className="grocery-stores--store-info">
                                    <span className="grocery-stores--store-name">{name}</span>
                                    <span className="grocery-stores--store-address">{vicinity}</span>
                                    <span className="grocery-stores--store-is-open">{isOpen}</span>
                                    <span className="grocery-stores--google-map"><a href={map_link} target="_blank">Open Google Maps</a></span>
                                </div>
                                <MDBBtn className="grocery-stores--store-selection-button btn-light-green" onClick={() => props.onStoreSelection(store)}>Select this store</MDBBtn>
                            </div>
                        </MDBListGroupItem>
                    )
                })
            }
        </MDBListGroup>
    )
}

export default StoreList;