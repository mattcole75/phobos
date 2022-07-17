import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RiskListItem from '../riskListItem/riskListItem';
import * as action from '../../../store/actions/index';

const Risks = (props) => {

    const { riskItems } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSelectRiskItem = useCallback((item, identifier) => dispatch(action.riskItemSelect(item, identifier)),[dispatch]);

    const navigateToRiskItem = () => {
        navigate('/riskitem');
    }

    const selectRiskItem = (item) => {
        onSelectRiskItem(item, 'SELECT_ITEM');
        navigateToRiskItem();
    }
    
    return (
        <div className='container'>
            <hr className='mb-3' />
            <div className='row mb-2'>
                {riskItems && riskItems.map((item, index) => (
                    <RiskListItem key={index} item={item} select={selectRiskItem}/>
                ))}
            </div>
        </div>
    );
}

export default Risks;