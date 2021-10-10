export const riskRegisterTextForm = {
    controls: {
        riskTitleLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'riskTitle'
            },
            value: 'Risk title',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        riskTitle: {
            elementType: 'input',
            elementConfig: {
                id: 'riskTitle',
                type: 'text',
                spellCheck: 'true',
                placeholder: 'Enter risk title'
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
        riskDescriptionLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'riskDescription'
            },
            value: 'Risk description',
            validation: {
                required: false,
                minLength: 2,
                maxLength: 500
            },
            visible: true,
            valid: true,
            touched: true
        },
        riskDescription: {
            elementType: 'textarea',
            elementConfig: {
                id: 'riskDescription',
                type: 'textarea',
                rows: 10,
                spellCheck: 'true',
                placeholder: 'Enter risk description'
            },
            value: '',
            validation: {
                required: true,
                maxLength: 500
            },
            visible: true,
            valid: false,
            touched: false
        },
        riskLikelihoodImpactStatementLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'risklikelihoodImpactStatement'
            },
            value: 'Likelihood & Impact Statement',
            validation: {
                required: false,
                minLength: 2,
                maxLength: 500
            },
            visible: true,
            valid: true,
            touched: true
        },
        riskLikelihoodImpactStatement: {
            elementType: 'textarea',
            elementConfig: {
                id: 'risklikelihoodImpactStatement',
                type: 'textarea',
                rows: 10,
                spellCheck: 'true',
                placeholder: 'Enter likelihood & Impact Statement'
            },
            value: '',
            validation: {
                required: true,
                maxLength: 500
            },
            visible: true,
            valid: false,
            touched: false
        }
    },
    formIsValid: false
}