import axios from '../../axios/auth';
import * as actionType from './actionTypes';
import { whatIsTheErrorMessage } from '../../shared/errorMessages';


// reducer interface function

const start = () => {
    return {
        type: actionType.LOCATION_START
    }
};

const success = (data, identifier) => {
    return {
        type: actionType.LOCATION_SUCCESS,
        data: data,
        identifier: identifier
    }
};

const finish = () => {
    return {
        type: actionType.LOCATION_FINISH
    };
};

const fail = (error) => {
    return {
        type: actionType.LOCATION_FAIL,
        error: error
    };
};

const stateReset = () => {
    return {
        type: actionType.LOCATION_STATE_RESET
    };
};

const errorReset = () => {
    return {
        type: actionType.LOCATION_ERROR_RESET
    }
};

const setRedirectPath = (redirectPath) => {
    return {
        type: actionType.LOCATION_REDIRECT_PATH,
        redirectPath: redirectPath
    };
};


// export functions

export const locationSendRequest = (url, method, data, idToken, identifier, param) => {
    return dispatch => {
        
        dispatch(start());
    
        axios({
            method: method,
            url: url,
            data: data,
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                param: param
            }
        })
        .then(response => {
            dispatch(success(response.data, identifier));
            dispatch(finish());
        })
        .catch(error => {
            dispatch(fail(whatIsTheErrorMessage(error)));
        })
    };
};

export const locationStateReset = () => {
    return dispatch => {
        dispatch(stateReset());
    };
};

export const locationErrorReset = () => {
    return dispatch => {
        dispatch(errorReset());
    };
};

export const locationRedirectPath = (redirectPath) => {
    return dispatch => {
        dispatch(setRedirectPath(redirectPath()));
    };
};