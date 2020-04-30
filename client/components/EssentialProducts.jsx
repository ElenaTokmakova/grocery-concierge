import React, {Fragment, Component} from 'react';
import { MDBRow, MDBCol, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

// dev url is only required in development to make requests from client to server
let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3000';
}

// render this componetn anywhere, it gets its data itself and doesn't depend on parent props
export default class EssentialProducts extends Component {

    state = {
        products: []
    }

    componentDidMount(){

        // cancel previous request
        if (typeof this._source != typeof undefined) {
          this._source.cancel('Operation canceled due to new request');
        }

        // save the new request for cancellation
        this._source = axios.CancelToken.source();

        axios.get(DEV_URL + '/products', {
            // cancel token used by axios
            cancelToken: this._source.token
          })
          .then(data => {
              this.setState({
                  products: data.data
              })
        }
          )
          .catch(error => {
            if(axios.isCancel(error)){
              console.log('Request is canceled', error);
            } else {
              console.log(error);
            }
          });
    }

    // Invoked right before React unmounts and destroys the component
    componentWillUnmount() {
      if (this._source) {
          this._source.cancel('Operation canceled due to component unmounting');
      }
    }
    render() {
        return (
            <Fragment>
                <p className="product-search-subtitle">COVID essential product list</p>
                <MDBListGroup className="essential-products-container">
                    {   this.state.products.length > 0 &&
                        this.state.products.map(product => {
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
}
