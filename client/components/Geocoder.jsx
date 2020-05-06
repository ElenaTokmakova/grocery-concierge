import React, { Component } from 'react';
import Geocode from "react-geocode";
import { MDBInput, MDBBtn } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from 'sweetalert2-react';

Geocode.setApiKey(process.env.API_KEY);

export default class GeocoderInput extends Component {
    state = {
        postalCode: '',
        lat: 43.643500,
        lng: -79.393520,
        show: false
    }

    getCoordsFromPostalCode = () => {

        if (!this.state.postalCode) {
            this.setState({ show: true });
            return;
        }

        Geocode.fromAddress(this.state.postalCode).then(
            response => {
              console.log("Geocoder response", response)
              const { lat, lng } = response.results[0].geometry.location;
              this.setState({
                  postalCode: ''
              })
              this.props.updateCoords(lat, lng)
            },
            error => {
              console.error(error);
              this.setState({ show: true });
            }
          );
    }

    onKeyPressed(event) {
        if (event.key === "Enter") {
          this.getCoordsFromPostalCode()
        }
    }

    render() {
        return (
            <div className="form-group geocoder-input-container">
                <MDBInput label="Enter postal code" outline size="lg" className="goecoder-input"
                            value={this.state.postalCode}
                            onKeyPress={(event) => this.onKeyPressed(event)}
                            onChange={(event) => this.setState({ postalCode: event.target.value })}/>
                <MDBBtn className="btn-lighter-green geocoder-submit-button" onClick={this.getCoordsFromPostalCode} >
                    <FontAwesomeIcon icon="angle-right"/>
                </MDBBtn>
                <SweetAlert
                    type="error"
                    confirmButtonColor="#a1bf63"
                    show={this.state.show}
                    title="Error"
                    text="Please enter a valid postal code"
                    onConfirm={() => this.setState({ show: false })}
                />
            </div>
        )
    }
}