import React, { Fragment, useContext } from 'react';
import { MDBRow } from 'mdbreact';
import NavigationLink from './components/NavigationLink';


const Exit = () => {

    return (
        <Fragment>
            <section className="screen-section screen-section-exit">
               <MDBRow className="justify-content-center">
                    <h3 className="concierge-warning">The application will close automatically in 5 minutes.</h3>
               </MDBRow>
               <MDBRow className="justify-content-center">
                <div className="countdown-container">4:29</div>
               </MDBRow>
               <MDBRow className="justify-content-center">
                    <h3>Say "start over" if you want to begin a new season.</h3>
               </MDBRow>
            </section>
            <section className="screen-navigation-links">
                <NavigationLink pathname='/kiosk/assistant' buttonText='Previous Screen'/>
                <NavigationLink pathname='/kiosk/welcome' buttonText='Back to Welcome Screen'/>
            </section>
        </Fragment>
    )
}

export default Exit;