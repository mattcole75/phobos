import React, {useRef, useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as action from '../../../store/actions/index';


const Search = React.memo((props) => {

    const {loadRisk} = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector(state => state.risk.loading);
    const error = useSelector(state => state.risk.error);
    // const identifier = useSelector(state => state.risk.identifier);
    const risks = useSelector(state => state.risk.risks);

    // const userId = useSelector(state => state.auth.localId);
    const idToken = useSelector(state => state.auth.idToken);

    const onLoadRisk = useCallback((idToken, identifier, param) => {
        dispatch(action.riskSendRequest('/risks','GET', null, idToken, identifier, param))
    },[dispatch]);

    const onClearRiskItem = useCallback((item, identifier) => dispatch(action.riskItemSelect(item, identifier)),[dispatch]);

    const navigateToRiskItem = () => {
      onClearRiskItem(null, 'CLEAR_ITEM');
      navigate('/riskitem');
  }

    useEffect(() => {
        const timer = setTimeout(() => {
          if(enteredFilter === inputRef.current.value || props.reloadRiskList) {
            const query =
                enteredFilter.length === 0
                ? ''
                : enteredFilter;
            onLoadRisk(idToken, 'GET_RISK', query)
          }
        }, 500);
        return () => {
          clearTimeout(timer);
        };
    }, [enteredFilter, inputRef, props.reloadRiskList, onLoadRisk, idToken]);
      
    useEffect(() => {
        if(!loading && !error && risks) {
            const loadedRisks = [];
            for(const key in risks) {
                loadedRisks.push({
                    _id: risks[key]._id,
                    title: risks[key].title,
                    description: risks[key].description,
                    likelihoodScore: risks[key].likelihoodScore,
                    appetiteScore: risks[key].appetiteScore,
                    healthSafetyScore: risks[key].healthSafetyScore,
                    financeScore: risks[key].financeScore,
                    serviceScore: risks[key].serviceScore,
                    humanResourceScore: risks[key].humanResourceScore,
                    projectsScore: risks[key].projectsScore,
                    reputationScore: risks[key].reputationScore,
                    complianceScore: risks[key].complianceScore,
                    objectivesScore: risks[key].objectivesScore,
                    publicityScore: risks[key].publicityScore,
                    controlMeasureItems: risks[key].controlMeasureItems,
                    potentialSourceItems: risks[key].potentialSourceItems,
                    recoveryItems: risks[key].recoveryItems,
                    updated: risks[key].updated,
                    created: risks[key].created
                    // score: data[key].score,
                    // status: data[key].status
                })
            }
            loadRisk(loadedRisks);
        }

    }, [risks, error, loading, props, loadRisk]);


    return (
        <div className='container d-flex flex-wrap justify-content-center mt-3'>

            <div className='d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none'>
                <h1 className="heading-primary">
                    <span className='heading-primary_main'>Risk</span>
                </h1>
            </div>

            <div className='col-12 col-lg-auto mb-3 mb-lg-0 mx-2'>
                <div className='btn-group float-start" role="group" aria-label="Basic example'>
                    <button type='button' className='btn btn-success' onClick={navigateToRiskItem}>Add new risk</button>
                </div>
            </div>
            
            <form className='col-12 col-lg-auto mb-3 mb-lg-0'>
                <input
                    type="search"
                    className='form-control'
                    ref={inputRef}
                    placeholder='Search...'
                    aria-label='Search'
                    value={enteredFilter}
                    onChange={event => setEnteredFilter(event.target.value)}
                />
            </form>
        </div>
    )

});

export default Search;