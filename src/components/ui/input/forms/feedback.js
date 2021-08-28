export const addFeedbackForm = {
    controls: {
        titleLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'title'
            },
            value: 'Feedback Title',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        title: {
            elementType: 'input',
            elementConfig: {
                id: 'title',
                type: 'text',
                spellCheck: 'true',
                placeholder: 'Feedback title ...'
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 50
            },
            visible: true,
            valid: false,
            touched: false
        },
        feedbackLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'feedback'
            },
            value: 'Feedback',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        feedback: {
            elementType: 'textarea',
            elementConfig: {
                id: 'feedback',
                type: 'textarea',
                rows: 7,
                spellCheck: 'true',
                placeholder: 'Feedback ...'
            },
            value: '',
            validation: {
                required: true,
                maxLength: 300
            },
            visible: true,
            valid: false,
            touched: false
        },
        submitButton: {
            elementType: 'button',
            elementConfig: {
                id: 'submit',
                type: 'button'
            },
            value: 'Save',
            visable: true,
            valid: true,
            touched: true
        }
    },
    formIsValid: false
}