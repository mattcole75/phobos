import React from 'react';
import img1 from '../../../assets/images/nat-1.jpg';
import img2 from '../../../assets/images/nat-2.jpg';
import img3 from '../../../assets/images/nat-3.jpg';

const about = () => (

    <section className="section-about">
        <div className="u-centre-text u-margin-bottom-big">
            <h2 className="heading-secondary">
                How risk management should be
            </h2>
        </div>
        <div className="row">
            <div className="col-half">
                <h3 className="heading-tertiary u-margin-bottom-small">You're going to fall in love with risk management</h3>
                <p className="paragraph">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam impedit quia nihil assumenda? Ad dignissimos rem fugiat quod, nostrum dolor nulla maxime consectetur ipsa. Tenetur unde quis praesentium nam aliquam.
                </p>

                <h3 className="heading-tertiary u-margin-bottom-small">Manage your risk like you never have before</h3>
                <p className="paragraph">
                    Aliquam et tellus semper, elementum purus sed, varius metus. In hac habitasse platea dictumst. Maecenas sapien mauris, tempus nec mattis id, lobortis quis sem. Vestibulum congue mi vitae ipsum gravida, volutpat vehicula neque interdum. Mauris non eleifend mauris. Maecenas et ante ut ligula interdum venenatis nec in lorem.
                </p>
                
                <a href="/companyDetails" className="btn">Learn more</a>
            </div>
            <div className="col-half">
                <div className="composition">
                    <img src={img1} alt="first" className="composition__img composition__img--i1" />
                    <img src={img2} alt="second" className="composition__img composition__img--i2" />
                    <img src={img3} alt="third" className="composition__img composition__img--i3" />
                </div>
            </div>
        </div>
    </section>
);

export default about;