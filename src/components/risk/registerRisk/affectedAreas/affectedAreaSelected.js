import React from 'react';

const areaSelected = (props) => {

    const {area, removeAreaHandler} = props;

    const submitHandler = () => {
        removeAreaHandler(area);
    }

    return (
        <div className="register-risk__list-container">
            <div className="register-risk__list-item">
                <p className="paragraph">{area.name}</p>
            </div>
            <div>
                <button className="btn btn--orange register-risk__list-item--button"
                onClick={submitHandler}>Remove</button>
            </div>
        </div>
    )

}

export default areaSelected;