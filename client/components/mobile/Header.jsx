import React from 'react';
import logo from '../../assets/images/logo.svg';

const Header = () => {

    return (
        <header className="mobile-header">
            <div className="mobile-header--wrapper">
                <div className="mobile-header--title">
                    <h1>
                        <img src={logo} alt="Grocery Concierge Logo"/>
                    </h1>
                </div>
                <a className="mobile-header--account-link" href="#">My Account</a>
            </div>
        </header>
    )
}

export default Header;