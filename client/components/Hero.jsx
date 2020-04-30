
import React from 'react';
import { MDBRow, MDBCol, MDBListGroup, MDBListGroupItem} from "mdbreact";
import twoMetersBanner from "../assets/images/2metres_apart_graphic.jpg";
import wearAMask from "../assets/images/people-wearing-medical-mask.jpg";
import EssentialProducts from './EssentialProducts';

const Hero = () => {

    return (
        <MDBRow className="hero-container">
            <MDBCol sm="12" md="4" className="essential-products-container">< EssentialProducts/></MDBCol>
            <MDBCol sm="12" md="4" className="banner-container">
                <p className="product-search-subtitle">Stay 2 meters apart and wear a mask</p>
                <div className="hero-images-container">
                    <img className="image-twoMetersBanner img-fluid" src={twoMetersBanner} />
                    <img className="image-wearMask img-fluid" src={wearAMask} />
                </div>
                </MDBCol>
            <MDBCol sm="12" md="4" className="banner-container">
                <p className="product-search-subtitle">Grocery Shopping Guidelines</p>
                <MDBListGroup className="essential-products-container">
                    <MDBListGroupItem>1. Follow the guidelines issued by government authorities.</MDBListGroupItem>
                    <MDBListGroupItem>2. If you have any symptoms, stay home.</MDBListGroupItem>
                    <MDBListGroupItem>3. Have a designated shopper for a family and limit your trips.</MDBListGroupItem>
                    <MDBListGroupItem>4. Avoid over-handling products and buy only what you need.</MDBListGroupItem>
                    <MDBListGroupItem>5. Pay with credit or debit cards, if possible.</MDBListGroupItem>
                </MDBListGroup>
            </MDBCol>
        </MDBRow>
    )
}

export default Hero;