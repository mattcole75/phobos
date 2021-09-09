import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    data: null,
    identifier: null,
    feedbackRedirectPath: '/risk'
};

const intelliVerseStart = (state) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const intelliVerseSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        data: action.data,
        identifier: action.identifier
    });
};

const intelliVerseFinish = (state) => {
    return updateObject(state, {
        identifier: null
    });
};

const intelliVerseFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const intelliVerseErrorReset = (state) => {
    return updateObject(state, {
        error: null
    });
};

const intelliVerseStateReset = (state) => {
    return updateObject(state, {
        loading: false,
        error: null,
        data: null,
        identifier: null,
        feedbackRedirectPath: '/risk'
    });
};

const intelliVerseRedirectPath = (state, action) => {
    return updateObject(state, {
        riskRedirectPath: action.riskRedirectPath
    });
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.INTELLIVERSE_START: return intelliVerseStart(state);
        case actionType.INTELLIVERSE_SUCCESS: return intelliVerseSuccess(state, action);
        case actionType.INTELLIVERSE_FINISH: return intelliVerseFinish(state);
        case actionType.INTELLIVERSE_FAIL: return intelliVerseFail(state, action);
        case actionType.INTELLIVERSE_ERROR_RESET: return intelliVerseErrorReset(state);
        case actionType.INTELLIVERSE_STATE_RESET: return intelliVerseStateReset(state);
        case actionType.INTELLIVERSE_REDIRECT_PATH: return intelliVerseRedirectPath(state, action);

        default: return state;
    };
};

export default reducer;