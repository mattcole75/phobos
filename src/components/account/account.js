import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../../store/actions/index';
import ViewAvatarImage from './avatarImage/view/avatarImage';
import FormAvatarImage from './avatarImage/form/avatarImage';
import ViewDisplayName from './displayName/view/displayName';
import FormDisplayName from './displayName/form/displayName';
import ViewEmail from './email/view/email';
import FormEmail from './email/form/email';
import ViewPassword from './password/view/password';
import FormPassword from './password/form/password';
import Backdrop from '../ui/backdrop/backdrop';
import Spinner from '../ui/spinner/spinner';
import Messages from '../ui/message/message';

const account = React.memo(() => {

    const [editingAvatarUrl, setEditingAvatarUrl] = useState(false);
    const [editingDisplayName, setEditingDisplayName] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);
    const identifier = useSelector(state => state.auth.identifier);
    const avatarUrl = useSelector(state => state.auth.avatarUrl);
    const displayName = useSelector(state => state.auth.displayName);
    const email = useSelector(state => state.auth.email);

    const dispatch = useDispatch();
    const onAccountUpdate = useCallback((authData, idToken, identifier) => dispatch(action.updateAccount(authData,idToken, identifier)), [dispatch]);
    const onAvatarUpdate = useCallback((avatarData, idToken, localId, identifier) => dispatch(action.updateAvatar(avatarData, idToken, localId, identifier)), [dispatch]);
    const onAvatarDelete = useCallback((idToken, localId, identifier) => dispatch(action.deleteAvatar(idToken, localId, identifier)), [dispatch]);
    const onClearError = () => dispatch(action.errorReset());

    const toggleEditingPhotoUrl = useCallback(() => {
        setEditingAvatarUrl(!editingAvatarUrl);
    }, [editingAvatarUrl])

    const toggleEditingDisplayName = useCallback(() => {
        setEditingDisplayName(!editingDisplayName);
    },[editingDisplayName]);

    const toggleEditingEmail = useCallback(() => {
        setEditingEmail(!editingEmail);
    },[editingEmail]);

    const toggleEditingPassword = useCallback(() => {
        setEditingPassword(!editingPassword);
    },[editingPassword]);

    const changeAccountHandler = useCallback((authData, idToken, identifier) => {
        onAccountUpdate(authData, idToken, identifier);
    },[onAccountUpdate]);
    
    const changeAvatarHandler = useCallback((avatarData, idToken, localId, identifier) => {
        if(avatarData)
            onAvatarUpdate(avatarData, idToken, localId, identifier);
        else
            onAvatarDelete(idToken, localId, identifier);
    }, [onAvatarDelete, onAvatarUpdate])



    useEffect(() => {
        if(!loading && !error && identifier === 'DISPLAY_NAME_CHANGE') {
            setEditingDisplayName(false);
        }

        if(!loading && !error && identifier === 'EMAIL_CHANGE') {
            setEditingEmail(false);
        }

        if(!loading && !error && identifier === 'PASSWORD_CHANGE') {
            setEditingPassword(false);
        }

        if(!loading && !error && identifier === 'AVATAR_IMAGE_CHANGE') {
            setEditingAvatarUrl(false);
        }
    },[loading, error, identifier]);

    let spinner = null;

    if(loading)
        spinner = <Spinner />;

    return (
        <section>
            {error && <Messages close={onClearError}>{error}</Messages>}
            <div className="section-account">

                <React.Fragment>
                    <Backdrop show={loading} />
                    {spinner}
                    <div className="row">
                        <div className="account">
                            <div className="account__form">

                                <div className="account__view">  
                                    {editingAvatarUrl
                                        ? <FormAvatarImage idToken={idToken} changeAvatarHandler={changeAvatarHandler} localId={localId} toggleEditingDisplayImage={toggleEditingPhotoUrl}/>
                                        : <ViewAvatarImage displayName={displayName} avatarUrl={avatarUrl} toggleEditingDisplayImage={toggleEditingPhotoUrl} />}
                                        <button
                                            className={editingAvatarUrl ? "btn form__align-right btn--orange" : "btn form__align-right"}
                                            disabled={editingDisplayName ? true : editingEmail ? true : editingPassword ? true : false}
                                            onClick={toggleEditingPhotoUrl}>
                                            {editingAvatarUrl
                                                ? "Cancel"
                                                : "Edit"}
                                        </button>
                                </div>

                                <hr className="u-margin-bottom-medium" />

                                <div className="account__view">  
                                    {editingDisplayName
                                        ? <FormDisplayName idToken={idToken} changeAccountHandler={changeAccountHandler} displayName={displayName} localId={localId}/>
                                        : <ViewDisplayName displayName={displayName} toggleEditingDisplayName={toggleEditingDisplayName} />}
                                        <button
                                            className={editingDisplayName ? "btn form__align-right btn--orange" : "btn form__align-right"}
                                            disabled={editingAvatarUrl ? true : editingEmail ? true : editingPassword ? true : false}
                                            onClick={toggleEditingDisplayName}>
                                            {editingDisplayName
                                                ? "Cancel"
                                                : "Edit"}
                                        </button>
                                </div>

                                <hr className="u-margin-bottom-medium" />

                                <div className="account__view">  
                                    {editingEmail
                                        ? <FormEmail idToken={idToken} changeAccountHandler={changeAccountHandler} email={email} localId={localId}/>
                                        : <ViewEmail email={email} />}
                                    <button
                                        className={editingEmail ? "btn form__align-right btn--orange" : "btn form__align-right"}
                                        disabled={editingAvatarUrl? true : editingDisplayName ? true : editingPassword ? true : false}
                                        onClick={toggleEditingEmail}>
                                        {editingEmail
                                            ? "Cancel"
                                            : "Edit"}
                                    </button>
                                </div>

                                <hr className="u-margin-bottom-medium" />
                                
                                <div className="account__view">  
                                    {editingPassword
                                        ? <FormPassword idToken={idToken} changeAccountHandler={changeAccountHandler} localId={localId}/>
                                        : <ViewPassword password="••••••••••••••" />}
                                    <button
                                        className={editingPassword ? "btn form__align-right btn--orange" : "btn form__align-right"}
                                        disabled={editingAvatarUrl ? true : editingDisplayName ? true : editingEmail ? true : false}
                                        onClick={toggleEditingPassword}>
                                        {editingPassword
                                            ? "Cancel"
                                            : "Edit"}
                                    </button>
                                </div>

                                <hr />

                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </div>
        </section>
    )

});

export default account;