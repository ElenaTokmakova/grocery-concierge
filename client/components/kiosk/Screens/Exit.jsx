import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdbreact';


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
                <Link to={{
                    pathname: `/kiosk/assistant`
                }}>
                    <button className="grocery-stores--store-selection-button button button-lighter-green" >
                        Previous Screen
                    </button>
                </Link>
                <Link to={{
                    pathname: `/kiosk/welcome`
                }}>
                    <button className="grocery-stores--store-selection-button button button-lighter-green" >
                        Back to Welcome Screen
                    </button>
                </Link>
            </section>
        </Fragment>
    )
}

export default withRouter(Exit);