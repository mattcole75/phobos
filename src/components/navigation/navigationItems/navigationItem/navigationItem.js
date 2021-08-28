import React from 'react';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
	
	<li className="navigation__item">
		<NavLink
			className="navigation__link"
			to={props.link}
			exact
			activeClassName=""
			onClick={props.toggleShow}>
			{props.children}
		</NavLink>
	</li>

);

export default navigationItem;
