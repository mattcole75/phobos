import * as actionType from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    idToken: null,
    localId: null,
    email: null,
    displayName: null,
    avatarUrl: null,
    identifier: null,
    message: null,
    authRedirectPath: '/'
};

const authStateReset = (state) => {
    return { ...state, ...initialState };
};

const authStart = (state) => {
    return { ...state,
        error: null,
        message: null,
        loading: true
    };
};

const authSuccess = (state, action) => {
    return { ...state,
        loading: false,
        error: null,
        idToken: action.idToken,
        localId: action.localId,
        email: action.email,
        displayName: action.displayName,
        avatarUrl: action.avatarUrl,
        identifier: action.identifier
    };
};

const authFinish = (state) => {
    return { ...state,
        identifier: null
    };
};

const authFail = (state, action) => {
    return { ...state,
        loading: false,
        error: action.error,
        message: null
    };
}

const authErrorReset = (state) => {
    return { ...state,
        error: null
    };
}

const authRedirectPath = (state, action) => {
    return { ...state,
        authRedirectPath: action.authRedirectPath
    };
};

const patchAvatarUrl = (state, action) => {
    return { ...state,
        loading: false,
        idToken: action.idToken,
        avatarUrl: action.avatarUrl,
        identifier: action.identifier
    };
};

const deleteAvatarUrl = (state, action) => {
    return { ...state,
        loading: false,
        idToken: action.idToken,
        avatarUrl: action.avatarUrl,
        identifier: action.identifier
    };
};

const patchDisplayName = (state, action) => {
    return { ...state,
        loading: false,
        displayName: action.displayName,
        identifier: action.identifier,
        message: action.message
    };
};

const patchEmail = (state, action) => {
    return { ...state,
        loading: false,
        email: action.email,
        identifier: action.identifier,
        message: action.message
    };
};

const patchPassword = (state, action) => {
    return { ...state,
        loading: false,
        identifier: action.identifier,
        message: action.message
    };
}

const postForgottenPassword = (state, action) => {
    return { ...state,
        email: action.email
    };
}

const authLogout = (state) => {
    return { ...state, initialState };
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.AUTH_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_FINISH: return authFinish(state);
        case actionType.AUTH_FAIL: return authFail(state, action);
        case actionType.AUTH_START: return authStart(state);
        case actionType.AUTH_STATE_RESET: return authStateReset(state);
        case actionType.AUTH_REDIRECT_PATH: return authRedirectPath(state, action);
        case actionType.AUTH_ERROR_RESET: return authErrorReset(state);
        case actionType.AUTH_PATCH_AVATAR_URL: return patchAvatarUrl(state, action);
        case actionType.AUTH_DELETE_AVATAR_URL: return deleteAvatarUrl(state, action);
        case actionType.AUTH_PATCH_DISPLAY_NAME: return patchDisplayName(state, action);
        case actionType.AUTH_PATCH_EMAIL: return patchEmail(state, action);
        case actionType.AUTH_PATCH_PASSWORD: return patchPassword(state, action);
        case actionType.AUTH_POST_FORGOTTEN_PASSWORD: return postForgottenPassword(state, action);
        case actionType.AUTH_LOGOUT: return authLogout(state);
        
        default: return state;
    }
};

export default reducer;