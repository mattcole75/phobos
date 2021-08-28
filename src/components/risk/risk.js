import React, {useReducer, useCallback, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Search from './search/search';
import Risks from './risks/risks';

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

const risk = React.memo((props) => {

    const [ riskItems, dispatchRisk ] = useReducer (riskReducer, []);
    const [redirect, setRedirect] = useState(null);


    const filteredRiskHandler = useCallback(filteredRisk => {
        dispatchRisk({
            type: 'SET', 
            riskItems: filteredRisk
        });
    }, [dispatchRisk]);
    
    const onAddRisk = () => {
        setRedirect(<Redirect to="/registerRisk" />)
    }
    

    return (

        <section className="section-risk">
            {redirect}
            <div className="row">
                <div className="u-margin-bottom-small">
                    <h2 className="heading-secondary">
                        Risk
                    </h2>
                </div>

                <div className="u-margin-bottom-small">
                    <Search loadRisk={filteredRiskHandler}/>
                </div>

                <div>
                    <Risks riskItems={riskItems} onAddRisk={onAddRisk}/>
                </div>

            </div>
        </section>
    )

});

export default risk;