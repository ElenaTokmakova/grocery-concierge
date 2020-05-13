import React, {Fragment} from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { MDBRow, MDBCol } from "mdbreact";

const Welcome = (props) => {

    return (
        <Fragment>
            <section className="screen-section screen-section-welcome">
               <MDBRow>
                <MDBCol md="2" className="circle-container">
                    {/* <div className="circle">
                        <span>AI</span>
                    </div> */}
                    <img className="grocery-concierge-icon" src={props.concierge} alt="Grocery Concierge icon"/>
                </MDBCol>
                <MDBCol md="10" className="text-container">
                    <h2>Welcome to Grocery Concierge.</h2>
                    <p>We can help you find what you are looking for in this store</p>
                    <p>Say <strong>"Let's Start"</strong> to continue or <strong>"Pause"</strong> to stay on this screen.</p>
                </MDBCol>
               </MDBRow>
            </section>
            <section className="screen-navigation-links">
                <Link className="screen-navigation-link" to={{
                    pathname: `/kiosk/looking`
                }}>
                    <button className="grocery-stores--store-selection-button button button-lighter-green" >
                        Next Screen
                    </button>
                </Link>
            </section>
        </Fragment>
    )
}

export default withRouter(Welcome);