import React from 'react';
import Navigation from '../../navigation/navigationItems/navigationItems';

const Header = (props) => (

    <header>
        <div className="px-3 py-2 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                        <h1 className="heading-primary">
                            <span className="heading-primary_main">phobos</span>
                            <span className="heading-primary_sub">real time risk management</span>
                        </h1>
                    </a>
                    <Navigation isAuthenticated={props.isAuthenticated}/>
                </div>
            </div>
        </div>
    </header>
);

export default Header;