import React, {useState} from 'react';
import Geocode from "react-geocode";
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
            <p className="geocoder-postal-code-label">Enter postal code</p>
            <div className="form-group postal-code-input-container">
                <label htmlFor="geocoder-input" className="sr-only">Enter postal code to find stores nearby</label>
                <input
                    type="text"
                    className="form-control form-control-lg geocoder-input"
                    id="geocoder-input"
                    value={postalCode}
                    onKeyPress={(event) => onKeyPressed(event)}
                    onChange={(event) => setPostalCode(event.target.value)}
                />
            </div>
            <button className="button button-lighter-green-fill geocoder-submit-button" onClick={getCoordsFromPostalCode} >
                <span className="sr-only">Find stores by postal code</span>
                <FontAwesomeIcon icon="angle-right"/>
            </button>
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