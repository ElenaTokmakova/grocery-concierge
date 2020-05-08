
import React from 'react';
import { MDBRow, MDBCol} from "mdbreact";
import twoMetersBanner from "../../assets/images/2metres_apart_graphic.png";
import concierge from '../../assets/images/concierge.jpg';
import EssentialProducts from './EssentialProducts';

const Hero = () => {

    return (
        <section className="hero-section">
            <MDBRow className="hero-container">
                <MDBCol sm="12" md="4" className="essential-products-container">< EssentialProducts/></MDBCol>
                <MDBCol sm="12" md="4" className="banner-container">
                    <img className="concierge-image img-fluid" src={concierge} alt="Cartoon concierge image"/>
                </MDBCol>
                <MDBCol sm="12" md="4" className="banner-container">
                    <p className="product-search-subtitle">Stay 2 meters apart and wear a mask</p>
                    <div className="hero-images-container">
                        <img className="image-twoMetersBanner img-fluid" src={twoMetersBanner} alt="Social distancing banner" />
                    </div>
                </MDBCol>
            </MDBRow>
        </section>
    )
}

export default Hero;