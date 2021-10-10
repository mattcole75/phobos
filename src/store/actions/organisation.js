import axios from '../../shared/axios';
import * as actionType from './actionTypes';
import { whatIsTheErrorMessage } from '../../shared/errorMessages';


// reducer interface function

const start = () => {
    return {
        type: actionType.ORGANISATION_START
    }
};

const success = (data, identifier) => {
    return {
        type: actionType.ORGANISATION_SUCCESS,
        data: data,
        identifier: identifier
    }
};

const finish = () => {
    return {
        type: actionType.ORGANISATION_FINISH
    };
};

const fail = (error) => {
    return {
        type: actionType.ORGANISATION_FAIL,
        error: error
    };
};

const stateReset = () => {
    return {
        type: actionType.ORGANISATION_STATE_RESET
    };
};

const errorReset = () => {
    return {
        type: actionType.ORGANISATION_ERROR_RESET
    }
};

const setRedirectPath = (redirectPath) => {
    return {
        type: actionType.ORGANISATION_REDIRECT_PATH,
        redirectPath: redirectPath
    };
};


// export functions

export const organisationSendRequest = (url, method, data, idToken, identifier, param) => {
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

export const organisationStateReset = () => {
    return dispatch => {
        dispatch(stateReset());
    };
};

export const organisationErrorReset = () => {
    return dispatch => {
        dispatch(errorReset());
    };
};

export const organisationRedirectPath = (redirectPath) => {
    return dispatch => {
        dispatch(setRedirectPath(redirectPath()));
    };
};