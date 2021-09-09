import React from 'react';

const likelihoodImpactHeader = (props) => {

    const {toggleLikelihoodImpact} = props;

    return (
        <div onClick={toggleLikelihoodImpact} className="register-risk__header-item">
            <label className="form__label">Likeihood & Impact</label>
            <p className="paragraph register-risk__header-bar--item-paragraph">Score: 0</p>
        </div>
    )
}

export default likelihoodImpactHeader;