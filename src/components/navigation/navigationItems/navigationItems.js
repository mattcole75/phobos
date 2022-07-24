import React from 'react';
import NavigationItem from './navigationItem/navigationItem';
import MenuNavigationItem from './menuNavigationItem/menuNavigationItem';

const navigationItems = (props) => (
	<ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
		<NavigationItem link='/' icon='bi-house-door'>Home</NavigationItem>
		{/* { props.isAuthenticated
			? <NavigationItem link='/dashboard' icon='bi-speedometer2'>Dashboard</NavigationItem>
			: null
		} */}
		{ props.isAuthenticated
			? <NavigationItem link='/risk' icon='bi-exclamation-triangle'>Risk</NavigationItem>
			: null
		}
		{/* { props.isAuthenticated
			? <NavigationItem link='/opportunity' icon='bi-info-circle'>Opportunity</NavigationItem>
			: null
		} */}
		{/* { props.isAuthenticated
			? <NavigationItem link='/response' icon='bi-card-checklist'>Response</NavigationItem>
			: null
		} */}
		<div  className='dropdown text-end'>
			<a href="/" className="nav-link text-white dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
				<i className="bi-person fs-3 d-block text-sm-center"></i>
				Profile
			</a>
			<ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
				{ props.isAuthenticated
					? <MenuNavigationItem link='/account' icon='bi-person'> Account</MenuNavigationItem>
					: null
				}
				{ props.isAuthenticated
					? <li><hr className="dropdown-divider"/></li>
					: null
				}
				{ props.isAuthenticated
					? null
					: <MenuNavigationItem link='/login' icon='bi-person-check'> Login</MenuNavigationItem>
				}
				{ props.isAuthenticated
					? <MenuNavigationItem link='/logout' icon='bi-person-x'> Logout</MenuNavigationItem>
					: null
				}
				{ props.isAuthenticated
					? null
					: <MenuNavigationItem link='/signup' icon='bi-person-plus'> Signup</MenuNavigationItem>
				}
			</ul>
		</div>
	</ul>
);

export default navigationItems;
