import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

    it('should return the initial state when state is undefined', () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            error: null,
            idToken: null,
            localId: null,
            email: null,
            displayName: null,
            identifier: null,
            authRedirectPath: '/'
        });
    });

    it('should return the initial state upon authStateReset', () => {
        expect(reducer({
            loading: true,
            error: 'test-error-message',
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: 'test-identifier',
            authRedirectPath: '/test'
        },{
            type: actionTypes.AUTH_STATE_RESET
        })).toEqual({
            loading: false,
            error: null,
            idToken: null,
            localId: null,
            email: null,
            displayName: null,
            identifier: null,
            authRedirectPath: '/'
        });
    });

    it('should update {error, loading, identifier} upon authStart', () => {
        expect(reducer({
            loading: false,
            error: 'test-error-message',
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: null,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_START,
            identifier: 'changed-test-identifier'
        })).toEqual({
            loading: true,
            error: null,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: null,
            authRedirectPath: '/'
        });
    });

    it('should store user information upon authSuccess', () => {
        expect(reducer({
            loading: false,
            error: null,
            idToken: null,
            localId: null,
            email: null,
            displayName: null,
            identifier: null,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: 'test-identifier'
        })).toEqual({
            loading: false,
            error: null,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: 'test-identifier',
            authRedirectPath: '/'
        });
    });

    it('should update {loading, identifier} upon authFinish', () => {
        expect(reducer({
            loading: false,
            error: null,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: 'test-identifier',
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_FINISH
        })).toEqual({
            loading: false,
            error: null,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: null,
            authRedirectPath: '/'
        });
    });

    it('should update {loading, error} upon authFail', () => {
        expect(reducer({
            loading: true,
            error: null,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: 'test-identifier',
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_FAIL,
            error: 'test-error-message'
        })).toEqual({
            loading: false,
            error: 'test-error-message',
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: 'test-identifier',
            authRedirectPath: '/'
        });
    });

    it('should update {error} upon authErrorReset', () => {
        expect(reducer({
            loading: false,
            error: 'test-error-message',
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: 'test-identifier',
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_ERROR_RESET
        })).toEqual({
            loading: false,
            error: null,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: 'test-identifier',
            authRedirectPath: '/'
        });
    });

    it('should update {error} upon authLogout', () => {
        expect(reducer({
            loading: true,
            error: 'test-error-message',
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: 'test-identifier',
            authRedirectPath: '/test'
        },{
            type: actionTypes.AUTH_STATE_RESET
        })).toEqual({
            loading: false,
            error: null,
            idToken: null,
            localId: null,
            email: null,
            displayName: null,
            identifier: null,
            authRedirectPath: '/'
        });
    });

    it('should update {authRedirectPath} upon authRedirectPath', () => {
        expect(reducer({
            loading: false,
            error: null,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: null,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_REDIRECT_PATH,
            authRedirectPath: '/test'
        })).toEqual({
            loading: false,
            error: null,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: null,
            authRedirectPath: '/test'
        });
    });

    it('should update {displayName} upon postDisplayName', () => {
        expect(reducer({
            loading: false,
            error: null,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: null,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_POST_DISPLAY_NAME,
            displayName: 'updated-test-display_name',
            identifier: 'CHANGE_DISPLAY_NAME'
        })).toEqual({
            loading: false,
            error: null,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'updated-test-display_name',
            identifier: 'CHANGE_DISPLAY_NAME',
            authRedirectPath: '/'
        });
    });

    it('should update {email} upon postEmail', () => {
        expect(reducer({
            loading: false,
            error: null,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: null,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_POST_EMAIL,
            email: 'updated@test.com',
            idToken: 'update-test-token',
            identifier: 'CHANGE_EMAIL'
        })).toEqual({
            loading: false,
            error: null,
            idToken: 'update-test-token',
            localId: 'test-local-id',
            email: 'updated@test.com',
            displayName: 'test-display-name',
            identifier: 'CHANGE_EMAIL',
            authRedirectPath: '/'
        });
    });

    it('should update {idToken} upon postPassword', () => {
        expect(reducer({
            loading: false,
            error: null,
            idToken: 'test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: null,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_POST_PASSWORD,
            idToken: 'update-test-token',
            identifier: 'CHANGE_PASSWORD'
        })).toEqual({
            loading: false,
            error: null,
            idToken: 'update-test-token',
            localId: 'test-local-id',
            email: 'test@test.com',
            displayName: 'test-display-name',
            identifier: 'CHANGE_PASSWORD',
            authRedirectPath: '/'
        });
    });

});