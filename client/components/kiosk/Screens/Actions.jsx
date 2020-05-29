import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import KioskContext from '../Context';
import { MDBRow, MDBCol } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SweetAlert from 'sweetalert2-react';
import NavigationLink from './components/NavigationLink';

const Action = (props) => {

    const [show, setShow] = useState(false);
    const { concierge } = useContext(KioskContext);

    useEffect( () => {
        if (props.intent === 'print' && !show) {
            setShow(true)
            setTimeout( () => setShow(false), 1500)
        }
    }, [props.intent])

    return (
        <Fragment>
            <section className="screen-section screen-section-actions">
                <MDBRow>
                    <MDBCol size="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={concierge} alt="Grocery Concierge icon"/>
                    </MDBCol>
                    <MDBCol size="10" className="text-container">
                        <h3 className="concierge-speaking">How can I help you?</h3>
                    </MDBCol>
               </MDBRow>
               <MDBRow>
                    <MDBCol lg="10" md="12" className="offset-lg-2 offset-md-0 concierge-action-buttons-container">
                        <div className="kiosk-action-button-container">
                            <Link to={{
                                pathname: `/kiosk/actions`
                            }} onClick={ () => setShow(true)}>
                                <button className="kiosk-action-button button button-orange-red">
                                <FontAwesomeIcon className="fa-icon" icon="print"/> Would you like me to print this map for you?
                                </button>
                            </Link>
                            <SweetAlert
                                type="success"
                                confirmButtonColor="#a1bf63"
                                show={show}
                                title="Success"
                                text="Your map has been printed!"
                                onConfirm={() => setShow(false)}
                            />
                            <Link to={{
                                pathname: `/kiosk/assistant`
                            }} >
                                <button className="kiosk-action-button button button-orange-red">
                                    <FontAwesomeIcon className="fa-icon" icon="phone-volume"/> Would you like me to call for assistance?
                                </button>
                            </Link>
                        </div>
                        <div className="kiosk-action-button-container">
                            <Link to={{
                                pathname: `/kiosk/looking`
                            }} >
                                <button className="kiosk-action-button button button-orange-red">
                                    <FontAwesomeIcon className="fa-icon" icon="question"/> Ask me another question
                                </button>
                            </Link>
                            <Link to={{
                                pathname: `/kiosk/welcome`
                            }} >
                                <button className="kiosk-action-button button button-orange-red">
                                    <FontAwesomeIcon className="fa-icon" icon="sign-out-alt"/> I'm done! Bye for now
                                </button>
                            </Link>
                        </div>
                    </MDBCol>
               </MDBRow>
            </section>
            <section className="screen-navigation-links">
                <NavigationLink pathname='/kiosk/found' buttonText='Previous Screen'/>
                <NavigationLink pathname='/kiosk/assistant' buttonText='Next Screen'/>
            </section>
        </Fragment>
    )
}

export default withRouter(Action);