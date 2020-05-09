import React, { Fragment, useReducer, useEffect } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import Header from './Header';

const App = () => {

    return (

      <Fragment>

          <Header />

          <MDBRow>
              <MDBCol md="3" className="kiosk-sidebar-wrapper">
                <aside className="kiosk-sidebar">

                </aside>
              </MDBCol>
              <MDBCol md="9">
                <main className="kiosk-main-content">

                </main>
              </MDBCol>
          </MDBRow>

      </Fragment>

    );
}

export default App;