import React from 'react';

const password = (props) => (

    <div className="account__align">
        <label className="form__label">Password</label>
        <span className="form__info">{props.password}</span>
    </div>
)

export default password;