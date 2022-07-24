import React, { useCallback, useEffect, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './layout/layout';

const Index = React.lazy(() => {
	return import('./pages/index');
});
const Login = React.lazy(() => {
	return import('./pages/auth/login');
});
const Logout = React.lazy(() => {
	return import('./pages/auth/logout');
});
const Signup = React.lazy(() => {
	return import('./pages/auth/signup');
});
const Account = React.lazy(() => {
	return import('./pages/auth/account');
});
const Risk = React.lazy(() => {
	return import('./pages/risk/risk');
});
const RiskItem = React.lazy(() => {
	return import('./pages/risk/riskItem');
});

const App = () => {

	const isAuthenticated = useSelector(state => state.auth.idToken !== null);
	const dispatch = useDispatch();
	const onTryAutoLogin = useCallback(() => dispatch(actions.authCheckState()),[dispatch]);

	useEffect(() => {
		onTryAutoLogin();
	},[onTryAutoLogin]);

	let routes = (
		<Routes>
			<Route path="/" element={ <Index /> } />
			<Route path="/login" element={ <Login /> } />
			<Route path="/signup" element={ <Signup /> } />
		</Routes>
	);

	if(isAuthenticated) {
		routes = (
			<Routes>
				<Route path="/" element={ <Index /> } />
				<Route path="/login" element={ <Login /> } />
				<Route path="/logout" element={ <Logout /> } />
				<Route path="/account" element={ <Account /> } />
				<Route path="/risk" element={ <Risk /> } />
				<Route path="/riskitem" element={ <RiskItem /> } />
			</Routes>
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

export default App;