import React from 'react';

const feedbackItem = (props) => (
    <div className="row">
        <div className="feedback">
            <figure className="feedback__shape">
                <img className="feedback__img" src={props.avatarUrl} alt={props.displayName} />
                <figcaption className="feedback__caption">
                    {props.displayName}
                </figcaption>
            </figure>
            <div className="feedback__text">
            <h3 className="heading-tertiary u-margin-bottom-small">{props.title}</h3>
            <p className="paragraph ">{props.feedback}</p>
            </div>
        </div>
    </div>
);

export default feedbackItem;