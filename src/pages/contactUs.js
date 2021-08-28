import React from 'react';

const contactUs = () => (

    <section className="section-contactUs">
        <div className="buffer">
            <div className="row">
                <div className="col-one-third">
                    <div className="feature-box contactUs-boxHeight">
                        <i className="feature-box__icon icon-basic-geolocalize-01"></i>
                        <h3 className="heading-tertiary u-margin-bottom-small">Address</h3>
                        <p>Phobos</p>
                        <p>Manchester Piccadilly</p>
                        <p>Manchester</p>
                        <p>M1 1M</p>
                    </div>
                </div>

                <div className="col-one-third">
                    <div className="feature-box contactUs-boxHeight">
                        <i className="feature-box__icon icon-basic-smartphone"></i>
                        <h3 className="heading-tertiary u-margin-bottom-small">Phone</h3>
                        <p>Office Hours: 09:00 - 17:00 GMT</p>
                        <p>07123 567 890</p>
                    </div>
                </div>
            
                <div className="col-one-third">
                    <div className="feature-box contactUs-boxHeight">
                        <i className="feature-box__icon icon-basic-mail"></i>
                        <h3 className="heading-tertiary u-margin-bottom-small">Email</h3>
                        <p>Email us anytime and we'll aim to get back to you the next working day</p>
                        <p>enquiries@phobos.co.uk</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

);

export default contactUs;