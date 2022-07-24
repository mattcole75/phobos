import React from 'react';

const RecoveryItem = (props) => {

    const { index, item, select, toggle } = props;

    const action = () => {
        select(index);
        toggle();
    }
    let iconStyle = [''];
    let badgeStyle = ['badge rounded-pill'];

    switch (item.status) {
        case 'Ready':
            iconStyle.push('bi-hand-thumbs-up access-icon-approved');
            badgeStyle.push('bg-success');
            break;
        case 'In progress':
            iconStyle.push('bi-asterisk access-icon-pending');
            badgeStyle.push('bg-warning');
            break;
        case 'Not started':
            iconStyle.push('bi-hand-thumbs-down access-icon-decline');
            badgeStyle.push('bg-danger');
            break;
        default:
            iconStyle.push('bi-wrench access-icon-pending');
            badgeStyle.push('bg-primary');
    }

    return (
        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={action}>
            <i className={iconStyle.join(' ')}></i>
            <div className="d-flex gap-2 w-100 justify-content-between" role="button">
                <div className="d-flex w-100 align-items-center justify-content-between">
                    <small>{item.category}</small>
                    <small>{item.title}</small>
                    <div className="p-1">
                        <small className={badgeStyle.join(' ')}>{item.status}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecoveryItem;