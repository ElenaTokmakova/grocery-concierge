import React from 'react';
import { MDBContainer, MDBRow, MDBCol} from "mdbreact";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/images/logo.svg';
import useDebounced from './utilities/useDebounced';

const Mode = ({ isVisible = true }) => {
    // The children are generally visible when `isVisible` is `true`. However when the
    // value switches to `false`, we need to render the children one additional frame, so
    // they can read the `isVisible: false` value. This avoids the stale props problem
    // that is created when `AnimatePresence` renders the previous children.

    const debouncedIsVisible = useDebounced(isVisible, isVisible ? 0 : 1) || false;

    return (
        <AnimatePresence>
            {
                debouncedIsVisible && (
                    <motion.div
                        key="loading-animation-container"
                        className="loading-animation-container"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.75, delay: 0.75}}
                        >
                        <div className="full-screen full-screen-mode">
                            <MDBContainer className="select-mode">
                                <MDBRow className="select-mode--logo-container">
                                    <img src={logo} alt="Grocery Concierge Logo"/>
                                </MDBRow>
                                <MDBRow className="select-mode--button-container">
                                    <MDBCol className="select-mode--button-column">
                                        <Link to='/mobile'>
                                            <div className="select-mode--icon-container">
                                                <FontAwesomeIcon className="select-mode--icon" icon="mobile-alt" />
                                            </div>
                                            <button className="select-mode--button button button-lighter-green-fill">
                                                Mobile Mode
                                            </button>
                                        </Link>
                                    </MDBCol>
                                    <MDBCol className="select-mode--button-column">
                                        <Link to='/kiosk'>
                                            <div className="select-mode--icon-container">
                                                <FontAwesomeIcon className="select-mode--icon" icon="desktop" />
                                            </div>
                                            <button className="select-mode--button button button-lighter-green-fill">
                                                Kiosk Mode
                                            </button>
                                        </Link>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Mode;