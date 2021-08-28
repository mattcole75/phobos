import React from 'react';
import logo from '../../../assets/images/logo-white.png';

const header = () => (

    <header className="header">

        <div className="header__logo-box">
            <img className="header__logo" src={logo} alt='real time risk management' />
        </div>
            <div className="header__title-box">
                <h1 className="heading_primary">
                    <span className="heading_primary--main">phobos</span>
                    <span className="heading_primary--sub">real time risk management</span>
                </h1>
            </div>
    </header>
);

export default header;