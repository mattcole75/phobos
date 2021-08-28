import React from 'react';
import Modal from '../components/ui/modal/modal';
import useHttpErrorHandler from '../hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent , axios) => {
    return props => {

        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <React.Fragment>
                <Modal 
                    show={error}
                    modalClosed={clearError}> 
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );

    }
}

export default withErrorHandler;