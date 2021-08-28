import React, {useState} from 'react';
import NavigationItems from './navigationItems/navigationItems';

const Navigation = (props) => {

    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show)

    return (

        <div className="navigation">
            <input 
                type="checkbox" 
                className="navigation__checkbox" 
                id="navi-toggle"
                checked={show}
                onChange={toggleShow}
                />
            <label htmlFor="navi-toggle" className="navigation__button">
                <span className="navigation__icon">&nbsp;</span>
            </label>
            <div className="navigation__background">&nbsp;</div>

            <NavigationItems isAuthenticated={props.isAuthenticated} toggleShow={toggleShow}/>
        </div>
    )
}

export default Navigation;