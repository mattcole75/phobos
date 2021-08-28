import axios from '../../shared/axios';
import * as actionType from './actionTypes';
import {whatIsTheErrorMessage} from '../../shared/errorMessages';

// reducer interface functions

const start = () => {
    return {
        type: actionType.RISK_START
    };
};

const success = (data, identifier) => {
    return {
        type: actionType.RISK_SUCCESS,
        data: data,
        identifier: identifier
    };
};

const finish = () => {
    return {
        type: actionType.RISK_FINISH
    };
};

const fail = (error) => {
    return {
        type: actionType.RISK_FAIL,
        error: error
    };
};

const stateReset = () => {
    return {
        type: actionType.RISK_STATE_RESET
    };
};

const errorReset = () => {
    return {
        type: actionType.RISK_ERROR_RESET
    };
};

const setRedirectPath = (redirectPath) => {
    return {
        type: actionType.RISK_REDIRECT_PATH,
        redirectPath: redirectPath
    };
};

// exported functions

export const riskSendRequest = (url, method, data, extra, identifier) => {

    return dispatch => {

        dispatch(start());

        axios({
            method: method,
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
          })
          .then(response => {
                dispatch(success(response.data, identifier));
                dispatch(finish());
          })
          .catch(error => {
                dispatch(fail(whatIsTheErrorMessage(error)));
          });
    };

};

export const riskStateReset = () => {

    return dispatch => {
        dispatch(stateReset());
    };

};

export const riskErrorReset = () => {

    return dispatch => {
        dispatch(errorReset());
    };

};

export const riskRedirectPath =(redirectPath) => {

    return dispatch => {
        dispatch(setRedirectPath(redirectPath))
    };

};