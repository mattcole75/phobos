import {useReducer, useCallback} from 'react';

const initialState = {
    status: null,
    formConfig: null
}

const reducer = (state, action) => {

    switch (action.type) {

        case 'SET':
            return {
                status: 'set',
                formConfig: action.formConfig
            };

        default:
            throw new Error('useForm reducer (no option)')
    }

}

const useForm = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const setFormConfig = useCallback ((formConfig, initialValues) => {
        if(initialValues) {
            const keys = Object.keys(initialValues);

            keys.forEach((key) => {
                formConfig.controls[key].value = initialValues[key];
            });
        }

        dispatch({
            type: 'SET', 
            formConfig: formConfig
        });

    }, []);

    return {
        status: state.status,
        formConfig: state.formConfig,
        setFormConfig: setFormConfig
    };
};

export default useForm;