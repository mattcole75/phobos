import axios from '../../axios/risk';
import * as actionType from './actionTypes';
import {whatIsTheErrorMessage} from '../../shared/errorMessages';

// reducer interface functions

const start = () => {
    return {
        type: actionType.RISK_START
    };
}

const postSuccess = (riskItem, identifier) => {
    return {
        type: actionType.RISK_POST_SUCCESS,
        riskItem: riskItem,
        identifier: identifier
    };
}

const patchSuccess = (riskItem, identifier) => {
    return {
        type: actionType.RISK_PATCH_SUCCESS,
        riskItem: riskItem,
        identifier: identifier
    };
}

const getSuccess = (risks, identifier) => {
    return {
        type: actionType.RISK_GET_SUCCESS,
        risks: risks,
        identifier: identifier
    };
}

const finish = () => {
    return {
        type: actionType.RISK_FINISH
    };
}

const select = (riskItem, identifier) => {
    return {
        type: actionType.RISK_SELECT,
        riskItem: riskItem,
        identifier: identifier
    };
}

const fail = (error) => {
    return {
        type: actionType.RISK_FAIL,
        error: error
    };
}

const stateReset = () => {
    return {
        type: actionType.RISK_STATE_RESET
    };
}

const errorReset = () => {
    return {
        type: actionType.RISK_ERROR_RESET
    };
}

const setRedirectPath = (redirectPath) => {
    return {
        type: actionType.RISK_REDIRECT_PATH,
        redirectPath: redirectPath
    };
};

// exported functions

export const riskItemSelect = (riskItem, identifier) => {
    return dispatch => {
        dispatch(start());
        dispatch(select(riskItem, identifier));
        dispatch(finish());
    };
}


export const riskSendRequest = (url, method, data, idToken, identifier, param) => {

    return dispatch => {

        dispatch(start());

        axios({
            method: method,
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                idToken: idToken,
                param: param
            }
            })
            .then(res => {
                switch (identifier) {
                    case 'POST_RISK_ITEM':
                        dispatch(postSuccess(res.data.risk, identifier));
                        break;
                    case 'PATCH_RISK_ITEM':
                        dispatch(patchSuccess(res.data.risk, identifier));
                        break;
                    default:
                        dispatch(getSuccess(res.data.risks, identifier));
                }
                dispatch(finish());
            })
            .catch(err => {
                dispatch(fail(whatIsTheErrorMessage(err)));
            });
    };

};

// export const registerRisk = (data, idToken, identifier) => {

//     return async dispatch => {
//         dispatch(start());

//         const firstRes = await axios({
//             method: 'POST',
//             url: '/phobos/risk',
//             data: data.risk,
//             headers: {
//                 'Content-Type': 'application/json',
//                 idToken: idToken,
//             }
//         })
//         .catch(error => {
//             dispatch(fail(whatIsTheErrorMessage(error)));
//         });

//         const [secondRes, thirdRes, forthRes] = await Promise.all([
//             axios({
//                 method: 'POST',
//                 url: '/phobos/risk/location',
//                 data: data.locations,
//                 headers: {
//                     'Content-Type': 'application/json',
//                     idToken: idToken,
//                     param: firstRes.data.msg.insertId
//                 }
//             })
//             .catch(error => {
//                 dispatch(fail(whatIsTheErrorMessage(error)));
//             }),
//             axios({
//                 method: 'POST',
//                 url: '/phobos/risk/keywordphrase',
//                 data: data.keyWordsPhrases,
//                 headers: {
//                     'Content-Type': 'application/json',
//                     idToken: idToken,
//                     param: firstRes.data.msg.insertId
//                 }
//             })
//             .catch(error => {
//                 dispatch(fail(whatIsTheErrorMessage(error)));
//             }),
//             axios({
//                 method: 'POST',
//                 url: '/phobos/risk/area',
//                 data: data.areas,
//                 headers: {
//                     'Content-Type': 'application/json',
//                     idToken: idToken,
//                     param: firstRes.data.msg.insertId
//                 }
//             })
//             .catch(error => {
//                 dispatch(fail(whatIsTheErrorMessage(error)));
//             })
//         ]);

//         dispatch(success([firstRes.data, secondRes.data, thirdRes.data, forthRes.data], identifier));
//         dispatch(finish());
//     }
// };

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