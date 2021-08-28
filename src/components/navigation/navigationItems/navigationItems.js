import React from 'react';
import NavigationItem from './navigationItem/navigationItem';

const navigationItems = (props) => (
	
		<nav className="navigation__nav">
			<ul className="navigation__list">
				<NavigationItem link="/" toggleShow={props.toggleShow}>Home</NavigationItem>
				{props.isAuthenticated
					? <NavigationItem link="/risk" toggleShow={props.toggleShow}>Risk</NavigationItem>
					: null}
				{props.isAuthenticated
					? <NavigationItem link="/account" toggleShow={props.toggleShow}>Account</NavigationItem>
					: null}
				{props.isAuthenticated
					? <NavigationItem link="/auth" toggleShow={props.toggleShow}>Log out</NavigationItem>
					: <NavigationItem link="/auth" toggleShow={props.toggleShow}>Log in</NavigationItem>}
			</ul>
		</nav>
);

export default navigationItems;
