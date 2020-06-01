import React from 'react';
import logo from '../../assets/images/logo.svg';
import { Link, withRouter } from 'react-router-dom';

const Header = (props) => {

    return (
        <header className="mobile-header">
            <div className="mobile-header--wrapper">
                <div className="mobile-header--logo">
                    <Link to={{
                        pathname: `/`
                        }}>
                        <img src={logo} alt="Grocery Concierge Logo"/>
                    </Link>
                </div>
                <Link className="mobile-header--account-link" to={{
                    pathname: `/mobile/account`
                    }}>
                    My Account
                </Link>
            </div>
        </header>
    )
}

export default withRouter(Header);