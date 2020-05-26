import React, {  Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, withRouter } from 'react-router-dom';

const Account = (props) => {

    return (
        <section className="mobile-section mobile-section-account">
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
                props.selectedPlaces.length !== 0 &&
                <Fragment>
                    <h3 className="mt-4">Your Recent Store(s)</h3>
                    <hr />
                    {
                        props.selectedPlaces.map( (store, index) => {
                            const { name, id, vicinity, open_now } = store;
                            const map_link = `https://www.google.com/maps/search/?api=1&query_place_id=${id}&query=${vicinity}`;
                            return (
                                <Fragment key={index}>
                                    <p className="selected-store" >
                                        <span className="store-name">{name}</span>
                                        <span className="store-address">{vicinity}</span>
                                        <span className="google-map"><a href={map_link} target="_blank">Open Google Maps</a></span>
                                        <span className="open-now">{ open_now ? 'Open Now' : 'Closed' }</span>
                                    </p>
                                    <div className="action-buttons action-buttons--account action-buttons--account-single-store">
                                        <Link to={{
                                            pathname: `/mobile/select-products`
                                            }} onClick={ () => { props.onStoreSelection(store) }}>
                                            <button className="search-results-button button button-lighter-green">
                                                Select this Store
                                            </button>
                                        </Link>
                                        <Link to={{
                                            pathname: `/mobile/bulletin`
                                            }}>
                                            <button className="search-results-button button button-lighter-green">
                                                News Bulletin
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="remove-store-button" onClick={ () => { props.removeStoreFromSelectedStoreList(store)}} >
                                        <FontAwesomeIcon className="fa-icon" icon="trash" className="remove-item-icon"/> <u>Remove store</u>
                                    </div>
                                    <hr />
                                </Fragment>
                            )
                        })
                    }
                    <div className="action-buttons action-buttons--account">
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
        </section>
    )
}

export default withRouter(Account);