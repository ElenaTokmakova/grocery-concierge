import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdbreact';


const Exit = () => {

    return (
        <Fragment>
            <section className="screen-section screen-section-exit">
               <MDBRow>
                <MDBCol md="2" className="circle-container">
                    <div className="circle">
                        <span>AI</span>
                    </div>
                </MDBCol>
                <MDBCol md="10">
                    <h2>Exit</h2>
                </MDBCol>
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