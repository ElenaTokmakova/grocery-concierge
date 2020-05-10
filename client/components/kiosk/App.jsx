import React, { Fragment, useReducer, useEffect, Suspense, lazy } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import Header from './Header';
import Sidebar from './Sidebar';
const MainContent = lazy(() => import('./MainContent'));
import { PushSpinner } from "react-spinners-kit";

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
                  <MainContent />
                </main>
              </MDBCol>
          </MDBRow>

      </Fragment>

    );
}

export default App;