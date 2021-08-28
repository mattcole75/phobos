import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    data: null,
    identifier: null,
    feedbackRedirectPath: './feedback'
};

const feedbackStart = (state) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const feedbackSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        data: action.data,
        identifier: action.identifier
    });
};

const feedbackFinish = (state) => {
    return updateObject(state, {
        identifier: null
    });
};

const feedbackFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const feedbackErrorReset = (state) => {
    return updateObject(state, {
        error: null
    });
};

const feedbackStateReset = (state) => {
    return updateObject(state, {
        initialState
    });
};

const feedbackRedirectPath = (state, action) => {
    return updateObject(state, {
        riskRedirectPath: action.riskRedirectPath
    });
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.FEEDBACK_START: return feedbackStart(state);
        case actionType.FEEDBACK_SUCCESS: return feedbackSuccess(state, action);
        case actionType.FEEDBACK_FINISH: return feedbackFinish(state);
        case actionType.FEEDBACK_FAIL: return feedbackFail(state, action);
        case actionType.FEEDBACK_ERROR_RESET: return feedbackErrorReset(state);
        case actionType.FEEDBACK_STATE_RESET: return feedbackStateReset(state);
        case actionType.FEEDBACK_REDIRECT_PATH: return feedbackRedirectPath(state, action);

        default: return state;
    };
};

export default reducer;