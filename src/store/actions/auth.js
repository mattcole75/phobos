import axios from '../../shared/axios';
import * as actionType from './actionTypes';
import {whatIsTheErrorMessage} from '../../shared/errorMessages';

// reducer interface functions

const authStart = () => {
    return {
        type: actionType.AUTH_START
    };
};

const authSuccess = (idToken, localId, email, displayName, avatarUrl, identifier) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId,
        email: email,
        displayName: displayName,
        avatarUrl: avatarUrl,
        identifier: identifier
    };
};

const authFinish = () => {
    return {
        type: actionType.AUTH_FINISH
    };
};

const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    };
};

const authStateReset = () => {
    return {
        type: actionType.AUTH_STATE_RESET
    };
};

const authErrorReset = () => {
    return {
        type: actionType.AUTH_ERROR_RESET
    };
};

const authRedirectPath = (authRedirectPath) => {
    return {
        type: actionType.AUTH_REDIRECT_PATH,
        authRedirectPath: authRedirectPath
    };
};

const authAvatarUrlUpdate = (idToken, avatarUrl, identifier) => {
    return {
        type: actionType.AUTH_PATCH_AVATAR_URL,
        avatarUrl: avatarUrl,
        idToken: idToken,
        identifier: identifier
    };
};

const authAvatarUrlDelete = (idToken, avatarUrl, identifier) => {
    return {
        type: actionType.AUTH_DELETE_AVATAR_URL,
        avatarUrl: avatarUrl,
        idToken: idToken,
        identifier: identifier
    };
};

const authDisplayNameUpdate = (idToken, displayName, identifier) => {
    return {
        type: actionType.AUTH_POST_DISPLAY_NAME,
        displayName: displayName,
        idToken: idToken,
        identifier: identifier
    };
};

const authEmailUpdate = (idToken, email, identifier) => {
    return {
        type: actionType.AUTH_POST_EMAIL,
        email: email,
        idToken: idToken,
        identifier: identifier
    };
};

const authPasswordUpdate = (idToken, identifier) => {
    return {
        type: actionType.AUTH_POST_PASSWORD,
        idToken: idToken,
        identifier: identifier
    };
}

//private functions

const deleteLocalStorage = () => {

    localStorage.removeItem('idToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');
    localStorage.removeItem('displayName');
    localStorage.removeItem('email');
    localStorage.removeItem('avatarUrl');
};

const setLocalStorage = (authData) => {

    const expirationDate = new Date(new Date().getTime() + authData.expiresIn * 1000);
    localStorage.setItem('idToken', authData.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('localId', authData.localId);
    localStorage.setItem('email', authData.email);
    localStorage.setItem('displayName', authData.displayName);
    localStorage.setItem('avatarUrl', authData.avatarUrl);
};

// exported functions

export const logout = () => {
    return dispatch => {
        deleteLocalStorage();
        dispatch(authStateReset());
    };
};

export const errorReset = () => { 
    return dispatch => { 
        dispatch(authErrorReset());
    };
};

export const changeRedirectPath = (redirectPath) => {
    return dispatch => {
        dispatch(authRedirectPath(redirectPath));
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const login = (authData, identifier) => {
    return dispatch => {

        dispatch(authStart());

        axios.post('/user/login', authData)
            .then(res => {

                setLocalStorage(res.data.user);

                dispatch(authSuccess(
                    res.data.user.idToken, 
                    res.data.user.localId, 
                    res.data.user.email, 
                    res.data.user.displayName,
                    res.data.user.avatarUrl,
                    identifier));

                dispatch(checkAuthTimeout(
                    res.data.user.expiresIn));

                dispatch(authFinish());

            })
            .catch(err => {
        
                dispatch(authFail(whatIsTheErrorMessage(err))); 
            });
    };
};

export const registerAccount = (authData, identifier) => {
    return dispatch => {

        dispatch(authStart());

        axios.post('/user', authData)
            .then(res => {
                
                setLocalStorage(res.data);

                dispatch(authSuccess(
                    null, // res.data.user.idToken, 
                    null, // res.data.user.localId, 
                    null, // res.data.user.email, 
                    null, //res.data.user.displayName,
                    null, // res.data.user.avatarUrl
                    identifier));

                dispatch(authFinish());
            })
            .catch(err => {
                dispatch(authFail(whatIsTheErrorMessage(err))); 
            });
    };
};

export const passwordRequest = (authData, identifier) => {
    return dispatch => {

        dispatch(authStart());

        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC6PitjCMHh2egZo3zKkrq86IOiMMr-N1E';

        axios.post(url, authData)
            .then(response => {
                
                dispatch(authSuccess(
                    null, 
                    null, 
                    response.data.email,
                    null,
                    null,
                    identifier));

                dispatch(authFinish());

            })
            .catch(error => {

                dispatch(authFail(whatIsTheErrorMessage(error))); 
            });
    };
};

export const updateAccount = (authData, idToken, identifier) => {
    return dispatch => {

        dispatch(authStart());
            
        let url = '/user';

        let config = { 
            headers: {
                'content-type': 'application/json',
                idToken: idToken
            }
        };

        axios.patch(url, authData, config)
            .then(response => {
                switch (identifier) {

                    case 'DISPLAY_NAME_CHANGE':
                        dispatch(authDisplayNameUpdate(
                            response.data.user.idToken,
                            response.data.user.displayName,
                            identifier
                        ));

                        localStorage.setItem('idToken', response.data.user.idToken);
                        localStorage.setItem('displayName', response.data.user.displayName);

                        break;
                    case 'EMAIL_CHANGE':
                        dispatch(authEmailUpdate(
                            response.data.user.idToken,
                            response.data.user.email,
                            identifier
                        ));
                            
                        localStorage.setItem('idToken', response.data.user.idToken);
                        localStorage.setItem('email', response.data.user.email);
                        
                        break;
                    case 'PASSWORD_CHANGE':
                        dispatch(authPasswordUpdate(
                            response.data.user.idToken,
                            identifier
                        ));
                            
                        localStorage.setItem('idToken', response.data.user.idToken);
                        
                        break;
                    default:
                        throw new Error('Auth Actions POST Acount update Switch');
                    
                }

                dispatch(authFinish());

            })
            .catch(error => {
                dispatch(authFail(whatIsTheErrorMessage(error))); 
            });
    };
}

export const updateAvatar = (avatarData, idToken, localId, identifier) => {
    return dispatch => {
        dispatch(authStart());
            
        let url = '/user/avatar';

        let config = { 
            headers: {
                'content-type': 'multipart/form-data',
                idToken: idToken,
                localId: localId
            }
        };

        axios.patch(url, avatarData, config)
            .then(response => {

            dispatch(authAvatarUrlUpdate(
                response.data.user.idToken,
                response.data.user.avatarUrl,
                identifier
            ));

            localStorage.setItem('idToken', response.data.user.idToken);
            localStorage.setItem('avatarUrl', response.data.user.avatarUrl);

            dispatch(authFinish());

        })
        .catch(error => {
            dispatch(authFail(whatIsTheErrorMessage(error))); 
        });
    }
}

export const deleteAvatar = (idToken, localId, identifier) => {
    return dispatch => {
        dispatch(authStart());
            
        let url = '/user/avatar';

        let config = { 
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                localId: localId
            }
        };

        axios.delete(url, config)
            .then(response => {

            dispatch(authAvatarUrlDelete(
                response.data.user.idToken,
                response.data.user.avatarUrl,
                identifier
            ));

            localStorage.setItem('idToken', response.data.user.idToken);
            localStorage.setItem('avatarUrl', response.data.user.avatarUrl);

            dispatch(authFinish());

        })
        .catch(error => {
            dispatch(authFail(whatIsTheErrorMessage(error))); 
        });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken');
        const email = localStorage.getItem('email');
        const displayName = localStorage.getItem('displayName');
        const avatarUrl = localStorage.getItem('avatarUrl');

        if (!idToken) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
                dispatch(authStateReset());
            } else {
                const localId = localStorage.getItem('localId');
                dispatch(authSuccess(idToken, localId, email, displayName, avatarUrl, 'AUTH_CHECK_STATE'));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            } 
        }
    };
};