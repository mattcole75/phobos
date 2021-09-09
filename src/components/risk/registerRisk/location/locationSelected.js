import React from 'react';

const locationSelected = (props) => {

    const {location, removeLocationHandler} = props;

    const submitHandler = () => {
        removeLocationHandler(location);
    }

    return (
        <div className="register-risk__list-container">
            <div className="register-risk__list-item">
                <p className="paragraph">{location.result}</p>
            </div>
            <div>
                <button className="btn btn--orange register-risk__list-item--button"
                onClick={submitHandler}>Remove</button>
            </div>
        </div>
    )

}

export default locationSelected;