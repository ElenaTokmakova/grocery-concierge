import React from 'react';
import logo from '../../assets/images/logo.svg';
import { motion, AnimatePresence } from 'framer-motion';
import useDebounced from '../utilities/useDebounced';

const Loader = ({ isVisible }) => {
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
                            <div className="logo-container">
                                <img src={logo} alt="Grocery Concierge Logo"/>
                            </div>
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Loader;