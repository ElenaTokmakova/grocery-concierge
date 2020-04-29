import React from 'react';
import { Row, Col, Button, ListGroup, ListGroupItem, Table } from 'reactstrap';

const StoreList = props => {

    return (
        <ListGroup className="grocery-stores">
            {
                props.stores.map((store, index) => {
                    const {name} = store;
                    return (
                        <ListGroupItem key={index}>
                            <div className="grocery-stores--store" onClick={() => props.onStoreSelection(store)}>
                                <span className="grocery-stores--store-name">{name}</span>
                                <Button className="grocery-stores--store-selection-button" color="primary">Select</Button>
                            </div>
                        </ListGroupItem>
                    )
                })
            }
        </ListGroup>
    )
}

export default StoreList;