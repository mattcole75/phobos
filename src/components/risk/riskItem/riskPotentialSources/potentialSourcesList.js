import React from 'react';
import PotentialSourceItem from './potentialSourcesItem';

const PotentialSourcesList = (props) => {

    const { riskItem, toggle, select } = props;

    return (
        <div className='mb-3 border-bottom'>
            <h2 className="text-start">Potential sources:</h2> 
            <div className="text-start mb-3" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-success" onClick={toggle} >Add potential source</button>
            </div>
            
            <div className="list-group mb-3 text-start">
                {
                    (riskItem && riskItem.potentialSourceItems) && riskItem.potentialSourceItems.map((item, index) => {
                        return (
                            <PotentialSourceItem key={index} index={index} item={item} toggle={toggle} select={select} />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default PotentialSourcesList;