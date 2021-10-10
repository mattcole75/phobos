import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    data: null,
    identifier: null,
    redirectPath: './ORGANISATION'
};

const organisationStart = (state) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const organisationSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        data: action.data,
        identifier: action.identifier
    });
};

const organisationFinish = (state) => {
    return updateObject(state, {
        identifier: null
    });
};

const organisationFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const organisationErrorReset = (state) => {
    return updateObject(state, {
        error: null
    });
};

const organisationStateReset = (state) => {
    return updateObject(state, {
        initialState
    });
};

const organisationRedirectPath = (state, action) => {
    return updateObject(state, {
        riskRedirectPath: action.riskRedirectPath
    });
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.ORGANISATION_START: return organisationStart(state);
        case actionType.ORGANISATION_SUCCESS: return organisationSuccess(state, action);
        case actionType.ORGANISATION_FINISH: return organisationFinish(state);
        case actionType.ORGANISATION_FAIL: return organisationFail(state, action);
        case actionType.ORGANISATION_ERROR_RESET: return organisationErrorReset(state);
        case actionType.ORGANISATION_STATE_RESET: return organisationStateReset(state);
        case actionType.ORGANISATION_REDIRECT_PATH: return organisationRedirectPath(state, action);

        default: return state;
    };
};

export default reducer;