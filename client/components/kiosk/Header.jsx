import React from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import metalBackground from '../../assets/images/metal-background.jpg';

const Header = () => {

    return (
        <header className="kiosk-header">
            <div className="kiosk-header--wrapper">
                <MDBRow>
                    <MDBCol md="3" className="kiosk-header--image-background">
                        <img className="img-fluid" src={metalBackground} alt="Metal Background"/>
                    </MDBCol>
                    <MDBCol md="6" className="kiosk-header--content">
                    <p className="kiosk-header--warning">Do not touch screen</p>
                    <h1 className="kiosk-header--title">
                        Grocery Concierge
                    </h1>
                    </MDBCol>
                    <MDBCol md="3" className="kiosk-header--image-background">
                        <img className="img-fluid" src={metalBackground} alt="Metal Background"/>
                    </MDBCol>
                </MDBRow>
            </div>
        </header>
    )
}

export default Header;