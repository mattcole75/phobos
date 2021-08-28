// list of available auth actions
export {
    login,
    registerAccount,
    updateAccount,
    updateAvatar,
    deleteAvatar,
    passwordRequest,
    logout,
    errorReset,
    changeRedirectPath,
    authCheckState
} from './auth';

export {
    feedbackSendRequest,
    feedbackStateReset,
    feedbackErrorReset,
    feedbackRedirectPath
} from './feedback';

export {
    riskSendRequest,
    riskStateReset,
    riskErrorReset,
    riskRedirectPath
} from './risk';