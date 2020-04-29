import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBBtn } from "mdbreact";

const StoreList = props => {

    return (
        <MDBListGroup className="grocery-stores">
            {
                props.stores.map((store, index) => {
                    const {name} = store;
                    return (
                        <MDBListGroupItem key={index}>
                            <div className="grocery-stores--store" onClick={() => props.onStoreSelection(store)}>
                                <span className="grocery-stores--store-name">{name}</span>
                                <MDBBtn className="grocery-stores--store-selection-button" color="primary">Select</MDBBtn>
                            </div>
                        </MDBListGroupItem>
                    )
                })
            }
        </MDBListGroup>
    )
}

export default StoreList;