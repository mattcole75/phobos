import React, {useState, useEffect, useCallback} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../../store/actions/index';
import LogInForm from './logIn/logIn';
import RegisterAccountForm from './registerAccount/registerAccount';
import LogOutForm from './logOut/logOut';
import ForgotForm from './forgot/forgot';
import Backdrop from '../ui/backdrop/backdrop';
import Spinner from '../ui/spinner/spinner';
import Messages from '../ui/message/message';

const auth = React.memo(() => {

    const [mode, setMode] = useState('in');
    const [redirect, setRedirect] = useState(null);

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const isAuthenticated = useSelector(state => state.auth.idToken !== null);
    const identifier = useSelector(state => state.auth.identifier);
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath);

    const dispatch = useDispatch();
    const onLogin = useCallback((authData, identifier) => dispatch(action.login(authData, identifier)),[dispatch]);
    const onRegisterAccount = useCallback((authData, identifier) => dispatch(action.registerAccount(authData, identifier)), [dispatch]);
    const onForgottenPassword = useCallback((authData, identifier) => dispatch(action.passwordRequest(authData, identifier)), [dispatch]);
    const onLogout = useCallback(() => dispatch(action.logout()), [dispatch]);
    const onClearError = () => dispatch(action.errorReset());

    const logInHandler = useCallback((authData) => {

        onLogin(authData, 'LOGIN');

    }, [onLogin]);

    const logOutHandler = useCallback(() => {

        setRedirect(<Redirect to={authRedirectPath} />);
        onLogout('LOGOUT');

    },[onLogout, authRedirectPath]);
    
    const registerAccountHandler = useCallback((authData) => {

        onRegisterAccount(authData, 'CREATE');

    }, [onRegisterAccount]);
    
    const forgotHandler = useCallback(authData => {

        onForgottenPassword(authData, 'FORGOT');

    }, [onForgottenPassword]);

	const toggle = () => {

        switch (mode) {
            case 'in':
                setMode('up');
                break;
            case 'forgot':
                setMode('up');
                break;
            case 'out':
                setMode('out');
                break;
            default:
                setMode('in');
        }

    }

    const forgotPasswordHandler = () => {

        setMode('forgot');

    };

    useEffect (() => {

        if (isAuthenticated) {
            setMode('out');
        }

    }, [isAuthenticated]);

    useEffect(() => {

        if (identifier === 'FORGOT') {
            setMode('in');
        }

        if (identifier === 'LOGIN') {
            setRedirect(<Redirect to={authRedirectPath} />);
        }

        if (identifier === 'CREATE') {
            setMode('in');
            // setRedirect(<Redirect to={authRedirectPath} />);
        }


    }, [identifier, authRedirectPath]);

    let activeForm = null;
    let activeTitle = null;
    let activeInfo = null;

    switch (mode) {

        case 'up':
            activeForm = <RegisterAccountForm registerAccountHandler={registerAccountHandler}/>;
            activeTitle = 'Register an account';
            activeInfo = 'Already have an account?';
            break;
        
        case 'out':
            activeForm = <LogOutForm logOutHandler={logOutHandler} />
            activeTitle = 'Log out';
            activeInfo = 'Have a nice day!';
            break;
        
        case 'forgot':
            activeForm =  <ForgotForm forgotHandler={forgotHandler} />
            activeTitle = 'Forgotten password';
            activeInfo = 'Don\'t forget this one!';
            break;

        default:
            activeForm = <LogInForm logInHandler={logInHandler} forgotPasswordHandler={forgotPasswordHandler} />;
            activeTitle = 'Log in';
            activeInfo = 'New to Phobos?';

    }

    let spinner = null;

    if(loading)
        spinner = <Spinner />;
        
    return (
        <section>
            {error && <Messages close={onClearError}>{error}</Messages>}
            {redirect}
            <div className="section-auth">

                <React.Fragment>
                    <Backdrop show={loading} />
                    {spinner}
                    <div className="row">
                        <div className="auth">
                            <div className="auth__form">
                                <div className="u-margin-bottom-small">
                                    <h2 className="heading-secondary">
                                        {activeTitle}
                                    </h2>
                                </div>
                                <div className="u-margin-bottom-small">
                                    {activeForm}   
                                </div>
                                
                                <hr />
                                <div className="u-margin-bottom-small">
                                    <label className="form__label">{activeInfo}</label>
                                    {!isAuthenticated
                                        ? <button
                                            className="btn"
                                            type=""
                                            onClick={toggle}>{mode === 'up'
                                                ? 'Back to Log in' 
                                                : 'Create an account'}</button>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>                        
            </div>
        </section>
    );
});

export default auth;;