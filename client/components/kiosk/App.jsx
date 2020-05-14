import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Header from './Header';
import Sidebar from './Sidebar';
import KioskContext from './Context';
import MainContent from './MainContent';
import concierge from '../../assets/images/concierge.svg';
import customer from '../../assets/images/customer.svg';

const App = () => {

    return (

      <KioskContext.Provider value={{
          concierge,
          customer
        }}>

          <MDBContainer fluid >

            <Header />

            <MDBRow className="kiosk-content-wrapper">
                <MDBCol md="3" className="kiosk-sidebar-wrapper">
                  <aside className="kiosk-sidebar">
                    <Sidebar />
                  </aside>
                </MDBCol>
                <MDBCol md="9" className="kiosk-main-content-wrapper">
                  <main className="kiosk-main-content">
                      <MainContent />
                  </main>
                </MDBCol>
            </MDBRow>

          </MDBContainer>

      </ KioskContext.Provider>

    );
}

export default App;