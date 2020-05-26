import React, { Fragment, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { MDBRow, MDBCol } from 'mdbreact';
import KioskContext from '../Context';
import NavigationLink from './components/NavigationLink';
import grocery_store_aisle_small from "../../../assets/images/grocery_store_aisle_small.png";


const Found = (props) => {

    const { intent, outputBot, infoDisplay, speaking } = props;
    const history = useHistory();

    let conciergeReply = '';
    let location = '';

    if (intent === 'where' && outputBot) {
        conciergeReply = outputBot;
        location = infoDisplay;
        if (!speaking) {
            setTimeout( () => {
                history.push("/kiosk/actions");
            }, 3000);
        }
    }

    const { concierge } = useContext(KioskContext);

    return (
        <Fragment>
            <section className="screen-section screen-section-found">
                <MDBRow>
                    <MDBCol size="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={concierge} alt="Grocery Concierge icon"/>
                    </MDBCol>
                    <MDBCol size="10" className="text-container">
                        <h3 className="concierge-speaking">{ conciergeReply }</h3>
                    </MDBCol>
               </MDBRow>
               <MDBRow>
                    <MDBCol size="12" className="concierge-directions-container justify-content-center">
                        <img src={grocery_store_aisle_small} className="img-fluid" alt="Grocery store aisle"/>
                        {/* <h3 className="concierge-directions">{ location }</h3> */}
                    </MDBCol>
               </MDBRow>
            </section>
            <section className="screen-navigation-links">
                <NavigationLink pathname='/kiosk/looking' buttonText='Previous Screen'/>
                <NavigationLink pathname='/kiosk/actions' buttonText='Next Screen'/>
            </section>
        </Fragment>
    )
}

export default Found;