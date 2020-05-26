import React, {Fragment} from 'react';
import { MDBRow, MDBCol, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import metres_apart_graphic from "../../assets/images/2metres_apart_graphic.png";

const Bulletin = () => {

    return (
        <section className="mobile-section mobile-section-bulletin">
            <MDBRow>
                <MDBCol md="6" className="offset-md-3 concierge-action-buttons-container mb-4">
                    <img className="img-fluid" src={metres_apart_graphic} />
                </MDBCol>
            </MDBRow>
                <h3 className="underlined">News Bulletin</h3>
                <MDBListGroup>
                    <MDBListGroupItem>Stay away from each other at least 6 feet apart</MDBListGroupItem>
                    <MDBListGroupItem>Use hand sanitizer before entering the store and after</MDBListGroupItem>
                    <MDBListGroupItem>Don’t hoard beyond what you actually need</MDBListGroupItem>
                    <MDBListGroupItem>Look at the labels but don’t touch</MDBListGroupItem>
                    <MDBListGroupItem>Be extra-kind to the front line workers (cashiers, grocery clerks/stockers)</MDBListGroupItem>
                    <MDBListGroupItem>Bring your own bags</MDBListGroupItem>
                    <MDBListGroupItem>Wash/Soak your produce</MDBListGroupItem>
                    <MDBListGroupItem>Use credit cards/visa debit if possible.</MDBListGroupItem>
                </MDBListGroup>
        </section>
    )
}

export default Bulletin;