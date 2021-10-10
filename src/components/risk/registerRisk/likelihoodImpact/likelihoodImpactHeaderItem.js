import React from 'react';

const likelihoodImpactHeaderItem = React.memo(props => {

    const {value, likelihood, appetite} = props;

    let itemStyles = ['register-risk__dashboard-item'];
    
    let score = value[value.value].score * likelihood.value;
    let riskScore_appatiteScore_diff = (36-score) - (36-appetite[appetite.value].score);
    let direction = '';

    if(score <= 9)
        itemStyles.push('register-risk__impact-rag--green');
    else if (score > 24)
        itemStyles.push('register-risk__impact-rag--red');
    else
        itemStyles.push('register-risk__impact-rag--amber');

    if(riskScore_appatiteScore_diff <= -12)
        direction = '\u2191'; // arrow up
    else if (riskScore_appatiteScore_diff > 12)
        direction = '\u2193'; // arrow down
    else
        direction = '\u2194'; // arrow left and right

    return (
            <div className={itemStyles.join(' ')}>
                <label className="form__label">{value.label}</label>
                <div><span className="register-risk__impact-text">{value[value.value].title}</span></div>
                <div><span className="register-risk__impact-text">Score: {score}</span></div>
                {/* <div><span className="register-risk__impact-text">Direction of travel</span></div> */}
                <div><span className="register-risk__direction-text">{direction}</span></div>
        </div>
    )
});

export default likelihoodImpactHeaderItem;