import React, { Fragment, createContext, lazy } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
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

          <Header />

          <MDBRow className="kiosk-content-wrapper">
              <MDBCol md="3" className="kiosk-sidebar-wrapper">
                <aside className="kiosk-sidebar">
                  <Sidebar />
                </aside>
              </MDBCol>
              <MDBCol md="9">
                <main className="kiosk-main-content">
                    <MainContent />
                </main>
              </MDBCol>
          </MDBRow>

      </ KioskContext.Provider>

    );
}

export default App;