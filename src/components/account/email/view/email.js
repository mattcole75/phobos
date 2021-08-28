import React from 'react'; 

const email = (props) => (

    <div className="account__align">
        <label className="form__label">Email address</label>
        <span className="form__info">{props.email}</span>
    </div>

)

export default email;