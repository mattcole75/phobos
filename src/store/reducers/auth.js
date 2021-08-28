import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    idToken: null,
    localId: null,
    email: null,
    displayName: null,
    avatarUrl: null,
    identifier: null,
    authRedirectPath: '/'
};

const authStateReset = (state) => {
    return updateObject( state, initialState);
};

const authStart = (state) => {
    return updateObject( state, {
        error: null,
        loading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject( state, {
        loading: false,
        error: null,
        idToken: action.idToken,
        localId: action.localId,
        email: action.email,
        displayName: action.displayName,
        avatarUrl: action.avatarUrl,
        identifier: action.identifier
    });
};

const authFinish = (state) => {
    return updateObject( state, {
        identifier: null
    });
};

const authFail = (state, action) => {
    return updateObject( state, {
        loading: false,
        error: action.error
    });
}

const authErrorReset = (state) => {
    return updateObject( state, {
        error: null
    })
}

const authRedirectPath = (state, action) => {
    return updateObject( state, {
        authRedirectPath: action.authRedirectPath
    })
};

const patchAvatarUrl = (state, action) => {
    return updateObject( state, {
        loading: false,
        idToken: action.idToken,
        avatarUrl: action.avatarUrl,
        identifier: action.identifier
    });
};

const deleteAvatarUrl = (state, action) => {
    return updateObject( state, {
        loading: false,
        idToken: action.idToken,
        avatarUrl: action.avatarUrl,
        identifier: action.identifier
    });
};

const postDisplayName = (state, action) => {
    return updateObject( state, {
        loading: false,
        idToken: action.idToken,
        displayName: action.displayName,
        identifier: action.identifier
    });
};

const postEmail = (state, action) => {
    return updateObject( state, {
        loading: false,
        idToken: action.idToken,
        email: action.email,
        identifier: action.identifier
    });
};

const postPassword = (state, action) => {
    return updateObject( state, {
        loading: false,
        idToken: action.idToken,
        identifier: action.identifier
    });
}

const postForgottenPassword = (state, action) => {
    return updateObject( state, {
        email: action.email
    });
}

const authLogout = (state) => {
    return updateObject( state, initialState);
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
        case actionType.AUTH_POST_DISPLAY_NAME: return postDisplayName(state, action);
        case actionType.AUTH_POST_EMAIL: return postEmail(state, action);
        case actionType.AUTH_POST_PASSWORD: return postPassword(state, action);
        case actionType.AUTH_POST_FORGOTTEN_PASSWORD: return postForgottenPassword(state, action);
        case actionType.AUTH_LOGOUT: return authLogout(state);
        
        default: return state;
    }
};

export default reducer;