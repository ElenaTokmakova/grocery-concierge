import React, { Fragment, useState, useContext, useEffect } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import KioskContext from '../Context';
import NavigationLink from './components/NavigationLink';

const Exit = () => {

    const [timeLeft, setTimeLeft] = useState(300);
    const { concierge } = useContext(KioskContext);

    useEffect(() => {
        // exit early when we reach 0
        if (!timeLeft) return;

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
      }, [timeLeft]);

    return (
        <Fragment>
            <section className="screen-section screen-section-exit">
               <MDBRow>
                    <MDBCol size="2" className="circle-container">
                        <img className="grocery-concierge-icon" src={concierge} alt="Grocery Concierge icon"/>
                    </MDBCol>
                    <MDBCol size="10" className="text-container">
                        <h3 className="concierge-warning">I will leave to assist another customer in 5 minutes.</h3>
                    </MDBCol>
               </MDBRow>
               <MDBRow className="justify-content-center">
                <div className="countdown-container">{formatTime(timeLeft)}</div>
               </MDBRow>
               <MDBRow className="justify-content-center">
                    <h3>Say "Start Over" if you want to find something else.</h3>
               </MDBRow>
            </section>
            <section className="screen-navigation-links">
                <NavigationLink pathname='/kiosk/assistant' buttonText='Previous Screen'/>
                <NavigationLink pathname='/kiosk/welcome' buttonText='Back to Welcome Screen'/>
            </section>
        </Fragment>
    )
}

const formatTime = (seconds) => {
    return (
        <span>{ Math.floor((seconds / 60) % 60) } : {Math.floor(seconds % 60) == 0 ? '00' : Math.floor(seconds % 60) }</span>
    )
}

export default Exit;