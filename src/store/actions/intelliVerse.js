import axios from '../../shared/axios';
import * as actionType from './actionTypes';
import { whatIsTheErrorMessage } from '../../shared/errorMessages';

// reducer interface function

const start = () => {
    return {
        type: actionType.INTELLIVERSE_START
    }
};

const success = (data, identifier) => {
    return {
        type: actionType.INTELLIVERSE_SUCCESS,
        data: data,
        identifier: identifier
    }
};

const finish = () => {
    return {
        type: actionType.INTELLIVERSE_FINISH
    };
};

const fail = (error) => {
    return {
        type: actionType.INTELLIVERSE_FAIL,
        error: error
    };
};

const stateReset = () => {
    return {
        type: actionType.INTELLIVERSE_STATE_RESET
    };
};

const errorReset = () => {
    return {
        type: actionType.INTELLIVERSE_ERROR_RESET
    }
};

const setRedirectPath = (redirectPath) => {
    return {
        type: actionType.INTELLIVERSE_REDIRECT_PATH,
        redirectPath: redirectPath
    };
};


// export functions

export const intelliVerseSendRequest = (url, method, data, idToken, identifier, param, universe) => {
    return dispatch => {
        
        dispatch(start());
    
        axios({
            method: method,
            url: url,
            data: data,
            headers: {
                'content-type': 'application/json',
                idToken: idToken,
                param: param,
                universe: universe
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

export const intelliVerseStateReset = () => {
    return dispatch => {
        dispatch(stateReset());
    };
};

export const intelliVerseErrorReset = () => {
    return dispatch => {
        dispatch(errorReset());
    };
};

export const intelliVerseRedirectPath = (redirectPath) => {
    return dispatch => {
        dispatch(setRedirectPath(redirectPath()));
    };
};