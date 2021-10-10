import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    data: null,
    identifier: null,
    redirectPath: './ORGANISATION'
};

const locationStart = (state) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const locationSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        data: action.data,
        identifier: action.identifier
    });
};

const locationFinish = (state) => {
    return updateObject(state, {
        identifier: null
    });
};

const locationFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const locationErrorReset = (state) => {
    return updateObject(state, {
        error: null
    });
};

const locationStateReset = (state) => {
    return updateObject(state, {
        initialState
    });
};

const locationRedirectPath = (state, action) => {
    return updateObject(state, {
        riskRedirectPath: action.riskRedirectPath
    });
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.LOCATION_START: return locationStart(state);
        case actionType.LOCATION_SUCCESS: return locationSuccess(state, action);
        case actionType.LOCATION_FINISH: return locationFinish(state);
        case actionType.LOCATION_FAIL: return locationFail(state, action);
        case actionType.LOCATION_ERROR_RESET: return locationErrorReset(state);
        case actionType.LOCATION_STATE_RESET: return locationStateReset(state);
        case actionType.LOCATION_REDIRECT_PATH: return locationRedirectPath(state, action);

        default: return state;
    };
};

export default reducer;