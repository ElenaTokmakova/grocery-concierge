import React, {useState} from 'react';
import Geocode from "react-geocode";
import { MDBInput, MDBBtn } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from 'sweetalert2-react';

Geocode.setApiKey(process.env.API_KEY);

const GeocoderInput = (props) => {

    const [show, setShow] = useState(false);
    const [postalCode, setPostalCode] = useState('');

    const getCoordsFromPostalCode = () => {

        if (!postalCode) {
            setShow(true);
            return;
        }

        Geocode.fromAddress(postalCode).then(response => {
              const { lat, lng } = response.results[0].geometry.location;
              setPostalCode('');
              props.updateCoords(lat, lng);
            },
            error => {
              console.error(error);
              setShow(true);
            }
          );
    }

    const onKeyPressed = (event) => {
        if (event.key === "Enter") {
          getCoordsFromPostalCode();
        }
    }

    return (
        <div className="form-group geocoder-input-container">
            <MDBInput label="Enter postal code" outline size="lg" className="goecoder-input"
                        value={postalCode}
                        onKeyPress={(event) => onKeyPressed(event)}
                        onChange={(event) => setPostalCode(event.target.value)}/>
            <MDBBtn className="btn-lighter-green geocoder-submit-button" onClick={getCoordsFromPostalCode} >
                <FontAwesomeIcon icon="angle-right"/>
            </MDBBtn>
            <SweetAlert
                type="error"
                confirmButtonColor="#a1bf63"
                show={show}
                title="Error"
                text="Please enter a valid postal code"
                onConfirm={() => setShow(false)}
            />
        </div>
    )
}

export default GeocoderInput;