import React, { useCallback, useEffect, useState } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as action from '../../../store/actions/index';

import RiskHeader from './riskHeader/riskHeader';
import RiskScore from '../../risk/riskItem/riskScore/riskScore';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const Risk = () => {

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const loading = useSelector(state => state.risk.loading);
    const error = useSelector(state => state.risk.error);
    const riskItem = useSelector(state => state.risk.riskItem);
    const riskRedirectPath = useSelector(state => state.risk.riskRedirectPath);
    const isStateless = useSelector(state => state.risk.risks === null);

    const [update, setUpdate] = useState(null);

    const { idToken, localId } = auth;
    
    const onSave = useCallback((method, riskData, token, identifier, riskId) => {
        dispatch(action.riskSendRequest('/risk', method, riskData, token, identifier, riskId))
    },[dispatch]);

    const saveHandler = useCallback(data => {
        if(riskItem) {
            onSave('PATCH', data, idToken, 'PATCH_RISK_ITEM', riskItem._id);
        } else {
            let newData = { ...data, localId: localId };
            onSave('POST', newData, idToken, 'POST_RISK_ITEM', null);
        }
    }, [riskItem, onSave, idToken, localId]);

    // this use effedct is a workaround the useSelector for risk Item is stale following the onSave dispatch.
    // this means the saveHandler does not transition from POST to PATCH following this initial save (see saveHandler)
    // the useEffect has access to the new state following the dispatch and so I have added the following useEffect to 
    // act as an intermediary while I learn how to fix this

    useEffect(() => {
        if(update) {
            saveHandler(update);
            setUpdate(null);
        }
    }, [update, saveHandler])

    let spinner = null;
    if(loading){
        spinner = <Spinner />;
    }

    return (
        <div className='container'>
            {isStateless ? <Navigate to={riskRedirectPath} /> : null}
            <Backdrop show={loading} />
            {spinner}
            {error &&
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            }
            <div className='was-validated'>
                <div className="text-sm-center">
                    <h2 className="heading-primary m-2">
                        <span className='heading-primary_main'>Risk item</span>
                    </h2>
                </div>
                <div className="form-floating mb-3">
                    <RiskHeader riskItem={riskItem} save={setUpdate} />
                    <RiskScore riskItem={riskItem} save={setUpdate} />
                </div>
            </div>
        </div>
    );
}

export default Risk;