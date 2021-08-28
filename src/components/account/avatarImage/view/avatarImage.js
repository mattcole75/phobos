import React from 'react';
import { defaultAvatarUrl } from '../../../../config/defaults';

const avatarImage = (props) => (

        <div className="account__align account-image">
            <label className="form__label">Display image</label>
                <figure className="account-image__shape">
                    <img className="account-image__img" src={props.avatarUrl ? props.avatarUrl : defaultAvatarUrl} alt="" />
                    <figcaption className="account-image__caption">
                        {props.displayName}
                    </figcaption>
                </figure>
        </div>

)

export default avatarImage;