import React from 'react';
import logo from '../../../assets/images/logo-white.png';

const footer = () => (

    <footer className="footer">
        <div className="footer__logo-box u-margin-bottom-medium">
            <img className="footer__logo" src={logo} alt="Full logo" />
            <h1 className="heading_primary">
                    <span className="heading_primary--main">phobos</span>
                    <span className="heading_primary--sub">real time risk management</span>
                </h1>
        </div>
        <div className="row">
            <div className="col-half">
                <div className="footer__navigation">
                    <ul className="foot__list">
                        <li className="footer__item"><a href="/companyDetails" className="footer__link">Company Details</a></li>
                        <li className="footer__item"><a href="/contactUs" className="footer__link">Contact us</a></li>
                        <li className="footer__item"><a href="http://localhost:3000" className="footer__link">Privacy policy</a></li>
                        <li className="footer__item"><a href="http://localhost:3000" className="footer__link">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div className="col-half">
                <p className="footer__copyright">Copyright &copy; Freaks Manchester.</p>
                <p className="footer__credit">Design inspiration by: Jonas Schmedtmann</p>
            </div>
        </div>
    </footer>
)

export default footer;