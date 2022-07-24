import React, { useCallback, useEffect, useState } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as action from '../../../store/actions/index';

import RiskHeader from './riskHeader/riskHeader';
import RiskScore from '../../risk/riskItem/riskScore/riskScore';
import PotentialSourcesList from './riskPotentialSources/potentialSourcesList';
import PotentialSourceForm from './riskPotentialSources/potencialSourcesForm';
import ControlMeasureList from './riskControlMeasures/controlMeasureList';
import ControlMeasureForm from './riskControlMeasures/controlMeasureForm';
import RecoveryList from './riskIncidentRecovery/recoveryList';
import RecoveryForm from './riskIncidentRecovery/recoveryForm';
import Modal from '../../ui/modal/modal';
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

    const onControlMeasureItemSelect = useCallback((index, identifier) => dispatch(action.riskControlMeasureItemSelect(index, identifier)), [dispatch]);
    const onPotentialSourceItemSelect = useCallback((index, identifier) => dispatch(action.riskPotencialSourceItemSelect(index, identifier)), [dispatch]);
    const onRecoveryItemSelect = useCallback((index, identifier) => dispatch(action.riskRecoveryItemSelect(index, identifier)), [dispatch]);

    const controlMeasureItemIndex = useSelector(state => state.risk.controlMeasureItemIndex);
    const potentialSourceItemIndex = useSelector(state => state.risk.potentialSourceItemIndex);
    const recoveryItemIndex = useSelector(state => state.risk.recoveryItemIndex);

    const [update, setUpdate] = useState(null);
    const [editingPotentialSource, setEditingPotentialSource] = useState(false);
    const [editingControlMeasure, setEditingControlMeasure] = useState(false);
    const [editingRecovery, setEditingRecovery] = useState(false);

    const { idToken, localId } = auth;
    
    const onSave = useCallback((method, riskData, token, identifier, riskId) => {
        dispatch(action.riskSendRequest('/risk', method, riskData, token, identifier, riskId))
    },[dispatch]);

    const potentialSourceSelectHandler = useCallback((index) => {
        onPotentialSourceItemSelect(index, 'POTENTIAL_SOURCE_ITEM_SELECT');
    }, [onPotentialSourceItemSelect]);

    const togglePotentialSourceEdit = () => {
        if(editingPotentialSource)
            potentialSourceSelectHandler(null);

        setEditingPotentialSource(prevState => !prevState);
    };

    const controlMeasureSelectHandler = useCallback((index) => {
        onControlMeasureItemSelect(index, 'CONTROL_MEASURE_ITEM_SELECT');
    }, [onControlMeasureItemSelect]);

    const toggleControlMeasureEdit = () => {
        if(editingControlMeasure)
            controlMeasureSelectHandler(null);

        setEditingControlMeasure(prevState => !prevState);
    };

    const recoverySelectHandler = useCallback((index) => {
        onRecoveryItemSelect(index, 'RECOVERY_ITEM_SELECT');
    }, [onRecoveryItemSelect]);

    const toggleRecoveryEdit = () => {
        if(editingRecovery)
            recoverySelectHandler(null);

        setEditingRecovery(prevState => !prevState);
    };

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
    // act as an intermediary while I learn how to fix this.

    useEffect(() => {
        if(update) {
            saveHandler(update);
            setUpdate(null);
        }
    }, [update, saveHandler])

    let modal = null;
    if(editingControlMeasure) {
        modal = <Modal 
            show={editingControlMeasure} 
            modalClosed={toggleControlMeasureEdit} 
            content={
                <ControlMeasureForm 
                    toggle={toggleControlMeasureEdit}
                    save={saveHandler} 
                    riskItem={riskItem}
                    index={controlMeasureItemIndex}
                />
            }/>
    }

    if(editingPotentialSource) {
        modal = <Modal 
            show={editingPotentialSource} 
            modalClosed={togglePotentialSourceEdit} 
            content={
                <PotentialSourceForm 
                    toggle={togglePotentialSourceEdit}
                    save={saveHandler} 
                    riskItem={riskItem}
                    index={potentialSourceItemIndex}
                />
            }/>
    }

    if(editingRecovery) {
        modal = <Modal 
            show={editingRecovery} 
            modalClosed={toggleRecoveryEdit} 
            content={
                <RecoveryForm 
                    toggle={toggleRecoveryEdit}
                    save={saveHandler} 
                    riskItem={riskItem}
                    index={recoveryItemIndex}
                />
            }/>
    }

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
            {modal}
            <div className='was-validated'>
                <div className="text-sm-center">
                    <h2 className="heading-primary m-2">
                        <span className='heading-primary_main'>Risk item</span>
                    </h2>
                </div>
                <div className="form-floating mb-3">
                    <RiskHeader riskItem={riskItem} save={setUpdate} />
                    <PotentialSourcesList riskItem={riskItem} toggle={togglePotentialSourceEdit} select={potentialSourceSelectHandler} />
                    <ControlMeasureList riskItem={riskItem} toggle={toggleControlMeasureEdit} select={controlMeasureSelectHandler} />
                    <RiskScore riskItem={riskItem} save={setUpdate} />
                    <RecoveryList riskItem={riskItem} toggle={toggleRecoveryEdit} select={recoverySelectHandler} />
                </div>
            </div>
        </div>
    );
}

export default Risk;