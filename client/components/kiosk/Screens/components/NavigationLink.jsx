import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavigationLink = (props) => {

    return (
        <Link to={{
            pathname: props.pathname
        }}>
            <button className="grocery-stores--store-selection-button button button-lighter-green" >
                {props.buttonText}
            </button>
        </Link>
    )
}

export default withRouter(NavigationLink);