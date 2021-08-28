import React from 'react'; 

const displayName = (props) => (

        <div className="account__align">
            <label className="form__label">Display name</label>
            <span className="form__info">{props.displayName}</span>
        </div>

)

export default displayName;