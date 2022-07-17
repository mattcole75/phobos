import * as actionType from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    risks: null,
    riskItem: null,
    identifier: null,
    riskRedirectPath: '/risk'
};

const riskStart = (state) => {
    return { ...state,
        error: null,
        loading: true
    };
}

const riskPostSuccess = (state, action) => {
    return { ...state, 
        error: null,
        risks: state.risks.concat(action.riskItem),
        riskItem: action.riskItem,
        identifier: action.identifier
    };
}

const riskPatchSuccess = (state, action) => {
    const riskIndex = state.risks.findIndex(req => req._id === action.riskItem._id);
    const updatedRisks = [...state.risks];
    updatedRisks[riskIndex] = action.riskItem;
    return { ...state,
        error: null,
        risks: updatedRisks,
        riskItem: action.riskItem,
        identifier: action.identifier
    };
}

const riskGetSuccess = (state, action) => {
    return { ...state, 
        error: null,
        risks: action.risks,
        riskItem: null,
        identifier: action.identifier
    };
}

const riskFinish = (state) => {
    return { ...state, 
        loading: false,
        identifier: null
    };
}

const riskSelect = (state, action) => {
    return { ...state,
        riskItem: action.riskItem,
        identifier: action.identifier
    };
}

const riskFail = (state, action) => {
    return { ...state, 
        loading: false,
        error: action.error
    };
}

const riskErrorReset = (state) => {
    return { ...state,
        error: null
    };
}

const riskStateReset = (state) => {
    return { ...state,
        initialState
    };
}

const riskRedirectPath = (state, action) => {
    return { ...state,
        riskRedirectPath: action.riskRedirectPath
    };
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.RISK_START: return riskStart(state);
        case actionType.RISK_POST_SUCCESS: return riskPostSuccess(state, action);
        case actionType.RISK_PATCH_SUCCESS: return riskPatchSuccess(state, action);
        case actionType.RISK_GET_SUCCESS: return riskGetSuccess(state, action);
        case actionType.RISK_SELECT: return riskSelect(state, action);
        case actionType.RISK_FINISH: return riskFinish(state);
        case actionType.RISK_FAIL: return riskFail(state, action);
        case actionType.RISK_ERROR_RESET: return riskErrorReset(state);
        case actionType.RISK_STATE_RESET: return riskStateReset(state);
        case actionType.RISK_REDIRECT_PATH: return riskRedirectPath(state, action);
        default: return state;
    }

};

export default reducer;