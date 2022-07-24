import React from 'react';
import ControlMeasureItem from './controlMeasureItem';

const ControlMeasureList = (props) => {

    const { riskItem, toggle, select } = props;

    return (
        <div className='mb-3 border-bottom'>
            <h2 className="text-start">Control measures:</h2>
            <div className="text-start mb-3" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-success" onClick={toggle} >Add control measure</button>
            </div>
            
            <div className="list-group mb-3 text-start">
                {
                    (riskItem && riskItem.controlMeasureItems) && riskItem.controlMeasureItems.map((item, index) => {
                        return (
                            <ControlMeasureItem key={index} index={index} item={item} toggle={toggle} select={select} />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ControlMeasureList;