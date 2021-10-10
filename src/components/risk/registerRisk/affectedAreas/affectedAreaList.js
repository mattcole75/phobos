import React from 'react';

const areaList = (props) => {

    const {area, addAreaHandler} = props;

    const submitHandler = () => {
        addAreaHandler(area);
    }

    return (
        <div className="register-risk__list-container">
            <div className="register-risk__list-item">
                <p className="paragraph">{area.name}</p>
            </div>
            <div>
                <button className="btn register-risk__list-item--button"
                onClick={submitHandler}>Add</button>
            </div>
        </div>
    )
}

export default areaList;