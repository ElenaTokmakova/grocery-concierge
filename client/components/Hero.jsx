
import React from 'react';
import { MDBRow, MDBCol, MDBListGroup, MDBListGroupItem} from "mdbreact";
import twoMetersBanner from "../assets/images/2metres_apart_graphic.jpg";
import wearAMask from "../assets/images/people-wearing-medical-mask.jpg";
import concierge from '../assets/images/concierge.jpg';
import EssentialProducts from './EssentialProducts';

const Hero = () => {

    return (
        <MDBRow className="hero-container">
            <MDBCol sm="12" md="4" className="essential-products-container">< EssentialProducts/></MDBCol>
            <MDBCol sm="12" md="4" className="banner-container">
                <img className="concierge-image img-fluid" src={concierge} />
            </MDBCol>
            <MDBCol sm="12" md="4" className="banner-container">
                <p className="product-search-subtitle">Stay 2 meters apart and wear a mask</p>
                <div className="hero-images-container">
                    <img className="image-twoMetersBanner img-fluid" src={twoMetersBanner} />
                    {/* <img className="image-wearMask img-fluid" src={wearAMask} /> */}
                </div>
            </MDBCol>
        </MDBRow>
    )
}

export default Hero;