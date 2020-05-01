import React from 'react';

const Header = () => {

    return (
        <header className="header">
            <div className="header--wrapper">
                <div className="header--title">
                    <h1>
                        <span className="header--title-green">Grocery</span> <span className="header--title-white">Concierge</span>
                    </h1>
                </div>
                <a className="header--account-link" href="#">Account</a>
            </div>
        </header>
    )
}

export default Header;