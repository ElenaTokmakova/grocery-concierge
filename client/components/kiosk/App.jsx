import React, { Fragment, useReducer, useEffect } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import Header from './Header';
import Sidebar from './Sidebar';

const App = () => {

    return (

      <Fragment>

          <Header />

          <MDBRow>
              <MDBCol md="3" className="kiosk-sidebar-wrapper">
                <aside className="kiosk-sidebar">
                  <Sidebar />
                </aside>
              </MDBCol>
              <MDBCol md="9">
                <main className="kiosk-main-content">
                    Main content here
                </main>
              </MDBCol>
          </MDBRow>

      </Fragment>

    );
}

export default App;