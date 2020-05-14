import React from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import metalBackground from '../../assets/images/metal-background.png';

const Header = () => {

    return (
        <header className="kiosk-header">
            <div className="kiosk-header--wrapper">
                <MDBRow>
                    <MDBCol md="3" className="kiosk-header--image-background"></MDBCol>
                    <MDBCol md="6" className="kiosk-header--content">
                    <p className="kiosk-header--warning">Do not touch screen</p>
                    <h1 className="kiosk-header--title">
                        Grocery Concierge
                    </h1>
                    <div className="kiosk-header--controls">
                        <span>Sensor/Wave &mdash; </span>
                        <span><FontAwesomeIcon icon="dot-circle" className="kiosk-header--sensor-wave-control"/></span>
                        <span className="mic-icon">&bull; </span>
                        <span>&mdash; Mic </span>
                    </div>
                    </MDBCol>
                    <MDBCol md="3" className="kiosk-header--image-background"></MDBCol>
                </MDBRow>
            </div>
        </header>
    )
}

export default Header;