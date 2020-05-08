import React from 'react';
import logo from '../../assets/images/logo.svg';

const Header = () => {

    return (
        <header className="header">
            <div className="header--wrapper">
                <div className="header--title">
                    <h1>
                        <img src={logo} alt="Grocery Concierge Logo"/>
                    </h1>
                </div>
                <a className="header--account-link" href="#">Account</a>
            </div>
        </header>
    )
}

export default Header;