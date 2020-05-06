import React, {Fragment, useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

// dev url is only required in development to make requests from client to server
let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3000';
}

// render this componetn anywhere, it gets its data itself and doesn't depend on parent props
const EssentialProducts = () => {

    const [products, setProducts] = useState([]);

    const url = DEV_URL + '/products';

    // function annotated with async returns an implicit promise
    // an effect hook should return nothing or a clean up function
    // you can call an async function inside an effect

    useEffect(() => {

        // Set up a cancellation source
        let source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                const result = await axios(url, {
                    // Assign the source.token to this request
                    cancelToken: source.token
                });
                setProducts(result.data);
            } catch(error) {
                // Is this error because we cancelled it?
                if (axios.isCancel(error)) {
                    console.log(`Call for essential products was cancelled`);
                } else {
                    throw error;
                }
            }
        };

        fetchData();

        return () => {
            // Let's cancel the request on effect cleanup
            source.cancel();
        };

      },
      [url]
    );

    return (
        <Fragment>
            <p className="product-search-subtitle">COVID essential product list</p>
            <MDBListGroup className="essential-products-container">
                {   products.length > 0 &&
                    products.map(product => {
                        return (
                            <MDBListGroupItem key={product.name}>
                                <MDBRow>
                                    <MDBCol size="4"><FontAwesomeIcon icon={product.class} /></MDBCol>
                                    <MDBCol size="8" className="text-left"><span>{product.name}</span></MDBCol>
                                </MDBRow>
                            </MDBListGroupItem>
                        )
                    })
                }
            </MDBListGroup>
        </Fragment>
    )
}

export default EssentialProducts;