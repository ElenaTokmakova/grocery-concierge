import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavigateBack = (props) => {
    const { pathname, text } = props;
    return (
        <div className="back-navigation">
            <FontAwesomeIcon className="back-icon" icon="chevron-left"/>
            <Link className="back-link" to={{
                pathname: pathname
            }}>{ text }</Link>
        </div>
    )
}

export default withRouter(NavigateBack);