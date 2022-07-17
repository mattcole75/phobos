import axios from '../../axios/auth';
import * as actionType from './actionTypes';
import { whatIsTheErrorMessage } from '../../shared/errorMessages';


// reducer interface function

const start = () => {
    return {
        type: actionType.FEEDBACK_START
    }
};

const success = (data, identifier) => {
    return {
        type: actionType.FEEDBACK_SUCCESS,
        data: data,
        identifier: identifier
    }
};

const finish = () => {
    return {
        type: actionType.FEEDBACK_FINISH
    };
};

const fail = (error) => {
    return {
        type: actionType.FEEDBACK_FAIL,
        error: error
    };
};

const stateReset = () => {
    return {
        type: actionType.FEEDBACK_STATE_RESET
    };
};

const errorReset = () => {
    return {
        type: actionType.FEEDBACK_ERROR_RESET
    }
};

const setRedirectPath = (redirectPath) => {
    return {
        type: actionType.FEEDBACK_REDIRECT_PATH,
        redirectPath: redirectPath
    };
};


// export functions

export const feedbackSendRequest = (url, method, data, idToken, identifier, param) => {
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

export const feedbackStateReset = () => {
    return dispatch => {
        dispatch(stateReset());
    };
};

export const feedbackErrorReset = () => {
    return dispatch => {
        dispatch(errorReset());
    };
};

export const feedbackRedirectPath = (redirectPath) => {
    return dispatch => {
        dispatch(setRedirectPath(redirectPath()));
    };
};