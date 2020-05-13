import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdbreact';


const Assistant = (props) => {

    return (
        <Fragment>
            <section className="screen-section screen-sections-assistant">
               <MDBRow>
                <MDBCol md="2" className="circle-container">
                    <div className="circle">
                        <span>AI</span>
                    </div>
                </MDBCol>
                <MDBCol md="10">
                    <h2>Assistant</h2>
                </MDBCol>
               </MDBRow>
            </section>
            <section className="screen-navigation-links">
                <Link to={{
                    pathname: `/kiosk/actions`
                }}>
                    <button className="grocery-stores--store-selection-button button button-lighter-green" >
                        Previous Screen
                    </button>
                </Link>
                <Link to={{
                    pathname: `/kiosk/exit`
                }}>
                    <button className="grocery-stores--store-selection-button button button-lighter-green" >
                        Next Screen
                    </button>
                </Link>
            </section>
        </Fragment>
    )
}

export default withRouter(Assistant);