import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/ui/header/header';
import Navigation from '../components/navigation/navigation';
import Footer from '../components/ui/footer/footer';
// import SideDrawer from '../components/navigation/sideDrawer/sideDrawer';
// import NavigationBar from '../components/navigation/navigationBar/navigationBar';

const Layout = (props) => {

	const [showSideDrawer, setShowSideDrawer] = useState(false);

	const isAuthenticated = useSelector(state => state.auth.idToken !== null);

	// const closeSideDrawer = () => {
	// 	setShowSideDrawer(false);
	// }

	const toggleSideDrawer = () => {
		setShowSideDrawer(!showSideDrawer);
	}

	return (
		
		<React.Fragment>
			<Navigation isAuthenticated={isAuthenticated} />
			<Header toggleSideDrawer={toggleSideDrawer} />

			{/* <NavigationBar isAuthenticated={isAuthenticated} />
			
			<SideDrawer 
				isAuthenticated={isAuthenticated}
				open={showSideDrawer}
				close={closeSideDrawer} /> */}
			<main className="">
				{props.children}
			</main>

			<Footer />
		</React.Fragment>
		
	);
};

export default Layout;