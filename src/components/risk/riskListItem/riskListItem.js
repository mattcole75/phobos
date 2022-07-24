import React from 'react';
import moment from 'moment';

const riskListItem = (props) => {

    const { item, select } = props;

    const onSelect = () => {
        select(item);
    };
    
    return (

        <div className='col-md-6' onClick={onSelect}>
            <div className='row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'>
                <div className='d-flex gap-2 w-100 justify-content-between'>
                    <div className='col p-4 d-flex flex-column position-static'>
                        <strong className='d-inline-block mb-2 text-primary'>{item.accessRequestStatus}</strong>
                        <h3 className='mb-0'>{item.title}</h3>
                        <div className='mb-1 text-muted'>{moment(item.created).format('MMMM Do YYYY, h:mm:ss a')}</div>
                        <p className='card-text'><strong>Description: </strong>{item.description}</p>
                        <p className='card-text'><small className='text-muted'>Last updated: {moment(item.updated).startOf('hour').fromNow()}</small></p> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default riskListItem;