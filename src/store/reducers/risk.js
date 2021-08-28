import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    data: null,
    identifier: null,
    riskRedirectPath: '/risk'
};

const riskStart = (state) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const riskSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        data: action.data,
        identifier: action.identifier
    });
};

const riskFinish = (state) => {
    return updateObject(state, {
        identifier: null
    });
};

const riskFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const riskErrorReset = (state) => {
    return updateObject(state, {
        error: null
    });
};

const riskStateReset = (state) => {
    return updateObject(state, {
        initialState
    });
};

const riskRedirectPath = (state, action) => {
    return updateObject(state, {
        riskRedirectPath: action.riskRedirectPath
    });
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.RISK_START: return riskStart(state);
        case actionType.RISK_SUCCESS: return riskSuccess(state, action);
        case actionType.RISK_FINISH: return riskFinish(state);
        case actionType.RISK_FAIL: return riskFail(state, action);
        case actionType.RISK_ERROR_RESET: return riskErrorReset(state);
        case actionType.RISK_STATE_RESET: return riskStateReset(state);
        case actionType.RISK_REDIRECT_PATH: return riskRedirectPath(state, action);

        default: return state;
    }

};

export default reducer;