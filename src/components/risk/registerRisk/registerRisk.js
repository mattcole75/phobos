import React, {useCallback, useState} from 'react';
import KeyWordsPhrases from './form/keyWordsPhrases';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../../../store/actions/index';
import ErrorModal from '../../ui/errorModal/errorModal';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';


const registerRisk = React.memo((props) => {

    const loading = useSelector(state => state.risk.loading);
    const error = useSelector(state => state.risk.error);
    const identifier = useSelector(state => state.risk.identifier);
    const riskData = useSelector(state => state.risk.data);

    const displayName = useSelector(state => state.auth.displayName)
    const userId = useSelector(state => state.auth.localId);
    const idToken = useSelector(state => state.auth.idToken);
    const isAuthenticated = useSelector(state => state.auth.idToken !== null);

    const dispatch = useDispatch();

    const onPostRisk = useCallback((riskData, identifier) => dispatch(action.riskSendRequest('/risk.json?auth=' + idToken,'POST', riskData, null, identifier, null)),[dispatch, idToken]);
    const onSetRisk = useCallback((riskData, identifier) => dispatch(action.riskSendRequest('/risk.json?auth=' + idToken,'SET', riskData, null, identifier, null)), [dispatch, idToken]);

    

    const saveRiskHandler = useCallback((keyWordPhrase) => {

        const data = {
            userId: userId,
            title: displayName,
            keyWordPhrase: keyWordPhrase
        }

        if(riskData)
            onSetRisk(data, 'SET_RISK');
        else
            onPostRisk(data, 'POST_RISK');
    }, [userId, displayName, riskData, onSetRisk, onPostRisk]);
        
    return (

        <section className="section-registerRisk">
            <div className="row">
                <div className="registerRisk">
                    <div className="register__form">
                        <div className="u-margin-bottom-medium u-centre-text">
                            <h2 className="heading-secondary">
                                Register a risk
                            </h2>
                        </div>

                        <div className="register-risk__header">

                        </div>

                        {/* <div className="col-one-third">
                            <div className="riskMeta-box">
                                <i className="riskMeta-box__icon icon-basic-gunsight"></i>
                                <h3 className="heading-tertiary u-margin-bottom-small">Key words and phrases</h3>
                                <div className="riskForm">
                                    <KeyWordsPhrases saveRiskHandler={saveRiskHandler}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-one-third">
                            <div className="riskMeta-box">
                                <i className="riskMeta-box__icon icon-basic-link"></i>
                                <h3 className="heading-tertiary u-margin-bottom-small">Suggested key words and phrases</h3>
                                
                            </div>
                        </div>
                    
                        <div className="col-one-third">
                            <div className="riskMeta-box">
                                <i className="riskMeta-box__icon icon-basic-server2"></i>
                                <h3 className="heading-tertiary u-margin-bottom-small">Similar registered risks</h3>
                                
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>

    );
});

export default registerRisk;;