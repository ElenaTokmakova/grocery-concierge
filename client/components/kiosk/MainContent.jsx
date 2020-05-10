import React, {Fragment} from 'react';
import { MDBRow, MDBCol } from "mdbreact";

const MainContent = () => {

    return (
        <Fragment>
            <section className="welcome-screen">
               <MDBRow>
                <MDBCol md="3" className="circle-container">
                    <div className="circle">
                        <span>AI</span>
                    </div>
                </MDBCol>
                <MDBCol md="9">
                    <h2>Welcome to Grocery Concierge.</h2>
                    <p>We can help you find what you are looking for in this store</p>
                    <p>Say <strong>"Let's Start"</strong> to continuer or <strong>"Pause"</strong> to stay on this screen.</p>
                </MDBCol>
               </MDBRow>
            </section>
        </Fragment>
    )
}

export default MainContent;