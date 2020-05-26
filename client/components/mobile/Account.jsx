import React, {  Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, withRouter } from 'react-router-dom';

const Account = (props) => {

    const {name, id, vicinity, open_now} = props.selectedPlace;
    const map_link = `https://www.google.com/maps/search/?api=1&query_place_id=${id}&query=${vicinity}`;

    return (
        <Fragment>
            <h1>My Account</h1>
            <div className="account--action-buttons action-buttons">
                <Link to={{
                    pathname: `/mobile/saved-maps`
                    }}>
                    <button className="search-results-button button button-orange-red">
                            <FontAwesomeIcon className="fa-icon" icon="map-marker-alt"/> My Saved Maps
                    </button>
                </Link>
                <Link to={{
                    pathname: `/mobile/shopping-list`
                    }}>
                    <button className="search-results-button button button-orange-red">
                            <FontAwesomeIcon className="fa-icon" icon="clipboard-list"/> My Shopping List
                    </button>
                </Link>
            </div>
            {
                Object.keys(props.selectedPlace).length !== 0 &&
                <Fragment>
                    <h2 className="mt-4">Your Recent Store</h2>
                    <p className="selected-store">
                        <span className="store-name">{name}</span>
                        <span className="store-address">{vicinity}</span>
                        <span className="google-map"><a href={map_link} target="_blank">Open Google Maps</a></span>
                        <span className="open-now">{ open_now ? 'Open Now' : 'Closed' }</span>
                    </p>
                    <div className="account--action-buttons action-buttons">
                        <Link to={{
                            pathname: `/mobile/select-products`
                            }}>
                            <button className="search-results-button button button-lighter-green">
                                    <FontAwesomeIcon className="fa-icon" icon="hand-pointer"/> Select this Store
                            </button>
                        </Link>
                        <Link to={{
                            pathname: `/mobile/bulletin`
                            }}>
                            <button className="search-results-button button button-lighter-green">
                                    <FontAwesomeIcon className="fa-icon" icon="newspaper"/> News Bulletin
                            </button>
                        </Link>
                        <Link to={{
                            pathname: `/mobile/select-store`
                            }}>
                            <button className="search-results-button button button-orange-red">
                                    <FontAwesomeIcon className="fa-icon" icon="hand-pointer"/> Select New Store
                            </button>
                        </Link>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default withRouter(Account);