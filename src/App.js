import React, {useCallback, useEffect, Suspense} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './layout/layout';

const Index = React.lazy(() => {
	return import('./pages/index');
});
const Auth = React.lazy(() => {
	return import('./pages/auth');
});
const Account = React.lazy(() => {
	return import('./pages/account');
});
const Feedback = React.lazy(() => {
	return import('./pages/feedback');
});
const Risk = React.lazy(() => {
	return import('./pages/risk');
});
const RegisterRisk = React.lazy(() => {
	return import('./pages/registerRisk');
});
const CompanyDetails = React.lazy(() => {
	return import('./pages/companyDetails')
});
const ContactUs = React.lazy(() => {
	return import('./pages/contactUs');
});

const App = () => {

	const isAuthenticated = useSelector(state => state.auth.idToken !== null);

	const dispatch = useDispatch();
	const onTryAutoLogin = useCallback(() => dispatch(actions.authCheckState()),[dispatch]);

	useEffect(() => {
		onTryAutoLogin();
	},[onTryAutoLogin]);

	let routes = (
		<Switch>
			<Route exact path="/" component={Index} />
			<Route path="/companyDetails" render={() => <CompanyDetails />} />
			<Route path="/contactUs" render={() => <ContactUs />} />
			<Route path="/feedback" render={() => <Feedback />} />
			<Route path="/auth" render={() => <Auth />} />
			<Redirect to="/" />
		</Switch>
	);

	if(isAuthenticated) {
		routes = (
			<Switch>
				<Route exact path="/" component={Index} />
				<Route path="/auth" render={() => <Auth />} />
				<Route path="/companyDetails" render={() => <CompanyDetails />} />
				<Route path="/contactUs" render={() => <ContactUs />} />
				<Route path="/account" render={() => <Account />} />
				<Route path="/feedback" render={() => <Feedback />} />
				<Route path="/risk" render={() => <Risk />} />
				<Route path="/registerRisk" render={() => <RegisterRisk />} />
				<Redirect to="/" />
			</Switch>
		)
	}

	return (
		<div className="">
			<Layout>
				<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
			</Layout>
		</div>
	)
};

export default withRouter(App);