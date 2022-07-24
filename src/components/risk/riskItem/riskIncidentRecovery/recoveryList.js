import React from 'react';
import RecoveryItem from './recoveryItem';

const RecoveryList = (props) => {

    const { riskItem, toggle, select } = props;

    return (
        <div className='mb-3 border-bottom'>
            <h2 className="text-start">Incident Recovery:</h2>
            <div className="text-start mb-3" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-success" onClick={toggle} >Add recovery item</button>
            </div>
            
            <div className="list-group mb-3 text-start">
                {
                    (riskItem && riskItem.recoveryItems) && riskItem.recoveryItems.map((item, index) => {
                        return (
                            <RecoveryItem key={index} index={index} item={item} toggle={toggle} select={select} />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default RecoveryList;