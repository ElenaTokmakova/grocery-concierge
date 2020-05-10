import React, {Fragment} from 'react';

const Sidebar = () => {

    return (
        <Fragment>
            <section>
                <h3>Rabba Fine Foods</h3>
                <p>361 Front Street W, Toronto, ON</p>
                <p>M5V 3R5</p>
            </section>
            <section>
                <span>Last updated: 1 hour ago</span>
                <h3 className="underlined"><u>Items low in stock</u></h3>
                <ul className="list-inline">
                    <li className="list-inline-item">Cereals</li>
                    <li>Hand sanitizer</li>
                    <li>Toilet Paper</li>
                    <li>Noodles</li>
                </ul>
            </section>
            <section>
                <h3 className="underlined"><u>News Bulletin</u></h3>
                <ul className="list-inline">
                    <li>Stay away from each other at least 6 feet apart</li>
                    <li>Hand sanitizer before entering the store and after</li>
                </ul>
            </section>
        </Fragment>
    )
}

export default Sidebar;