import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import * as action from '../../store/actions/index';
import { hashPassword } from '../../shared/utility';
import Backdrop from '../ui/backdrop/backdrop';
import Spinner from '../ui/spinner/spinner';

const Account = () => {

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const { idToken, localId, displayName, email, loading, error, message, authRedirectPath } = auth;

    const onDisplayNameUpdate = useCallback((authData, identifier) => dispatch(action.updateDisplayName(authData, idToken, localId, identifier)), [dispatch, idToken, localId]);
    const onEmailUpdate = useCallback((authData, identifier) => dispatch(action.updateEmail(authData, idToken, localId, identifier)), [dispatch, idToken, localId]);
    const onPasswordUpdate = useCallback((authData, identifier) => dispatch(action.updatePassword(authData, idToken, localId, identifier)), [dispatch, idToken, localId]);
    // const onSignUp = useCallback((authData, identifier) => dispatch(action.signup(authData, identifier)), [dispatch]);
    

    const { register, handleSubmit, getValues, formState: { errors } } = useForm({ mode: 'onChange',defaultValues: {
        displayName: displayName,
        email: email
    } });

    const displayNameHandler = useCallback((data) => {
        onDisplayNameUpdate(getValues().displayName, 'UPDATE_DISPLAY_NAME');
    },[getValues, onDisplayNameUpdate]);

    const emailHandler = useCallback((data) => {
        onEmailUpdate(getValues().email, 'UPDATE_EMAIL');
    }, [getValues, onEmailUpdate]);

    const passwordHandler = useCallback((data) => {
        const hash = async () => {
            await hashPassword(getValues().password)
                .then(value => {
                    onPasswordUpdate(value, 'UPDATE_PASSWORD');
                })
        }
        hash();
    }, [getValues, onPasswordUpdate]);

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    return (
        <div className='form-auth my-5'>
            <Backdrop show={loading} />
                {spinner}
            
            {error &&
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            }
            {message &&
                <div className='alert alert-success' role='alert'>
                    {message}
                </div>
            }
            <form className='was-validated'>
                <i className='bi-person-bounding-box form-auth-icon'></i>
                <h1 className='h3 mb-3 fw-normal'>Edit account</h1>

                <div className='input-group mb-3'>
                    <div className='form-floating'>
                        <input 
                            type='text'
                            className='form-control'
                            id='displayName'
                            placeholder='Your name'
                            required minLength={3} maxLength={32}
                            {...register('displayName', { required: true, minLength: 3, maxLength: 32 })} />
                        <label htmlFor='displayName' className='form-label'>Display name</label>
                    </div>
                    <button 
                        type='button'
                        className='btn btn-primary'
                        onClick={handleSubmit(displayNameHandler)}
                        disabled={errors.displayName}>Save</button>
                </div>
                
                <div className='input-group mb-3'>
                    <div className='form-floating'>
                        <input 
                            type='email'
                            className='form-control'
                            id='email'
                            placeholder='name@example.com'
                            required
                            {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                        <label htmlFor='email' className='form-label'>Email address</label>
                    </div>
                    <button 
                        type='button' 
                        className='btn btn-primary' 
                        onClick={handleSubmit(emailHandler)}
                        disabled={errors.email}>Save</button>
                </div>

                <div className='input-group mb-3'>
                    <div className='form-floating'>
                        <input 
                            type='password'
                            className='form-control'
                            id='password'
                            placeholder='Password'
                            minLength={6} maxLength={255}
                            required {...register('password', { required: false, minLength: 6, maxLength: 255 })} />
                        <label htmlFor='password' className='form-label'>Password</label>
                    </div>
                    <button 
                        type='button' 
                        className='btn btn-primary'
                        onClick={handleSubmit(passwordHandler)}
                        disabled={errors.password}>Save</button>
                </div>

                {/* <button className='w-100 btn btn-lg btn-primary' type='submit' disabled={!formState.isValid}>Save</button> */}
            </form>
        </div>
    );
};

export default Account;