import React, { useReducer, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Search from './search/search';
import Risks from './risks/risks';
import Backdrop from '../ui/backdrop/backdrop';
import Spinner from '../ui/spinner/spinner';

const riskReducer = (currentRisk, action) => {

    switch (action.type) {
        case 'ADD':
            return [action.riskItem, ...currentRisk];
        case 'SET':
            return action.riskItems;
        case 'DELETE':
            return currentRisk.filter(rsk => rsk.id !== action.id);
        default:
            throw new Error('Risk reducer: no option');
    }
};

const risk = React.memo(props => {

    const [ riskItems, dispatchRisk ] = useReducer (riskReducer, []);
    const [ redirect, setRedirect ] = useState(null);

    const loading = useSelector(state => state.risk.loading);
    const error = useSelector(state => state.risk.error);


    const filteredRiskHandler = useCallback(filteredRisk => {
        dispatchRisk({
            type: 'SET', 
            riskItems: filteredRisk
        });
    }, [dispatchRisk]);
    
    const onAddRisk = () => {
        setRedirect(<Navigate to="/registerRisk" />)
    }

    let spinner = null;
    if(loading)
        spinner = <Spinner />;
    

    return (

        <section>
            {redirect}
            <Backdrop show={loading} />
            {spinner}
            {error &&
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            }

            <div className='u-margin-bottom-small'>
                <Search loadRisk={filteredRiskHandler}/>
            </div>

            <div>
                <Risks riskItems={riskItems} onAddRisk={onAddRisk}/>
            </div>

        </section>
    )

});

export default risk;