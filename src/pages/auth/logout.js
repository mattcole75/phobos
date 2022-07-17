import React, { useEffect, useCallback } from 'react';
import { useDispatch, } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import * as action from '../../store/actions/index';

const Logout = React.memo(() => {

    const dispatch = useDispatch();
    const onLogout = useCallback(() => dispatch(action.logout()), [dispatch]);
    const navigate = useNavigate();

    useEffect(() => {
        onLogout();
        navigate('/');
	},[onLogout, navigate]);

    return (
        <Navigate to={"/"} />
    )
});

export default Logout;