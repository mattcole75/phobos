export const keyWordsAndPhrasesForm = {
    controls: {
        keyWordPhrase: {
            elementType: 'input',
            elementConfig: {
                id: 'keyWordPhrase',
                type: 'text',
                spellCheck: 'true',
                placeholder: 'What\'s on your mind?'
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 60
            },
            visible: true,
            valid: false,
            touched: false
        }
    },
    formIsValid: false
}


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
                rows: 5,
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
        }
    },
    formIsValid: false
}

export const riskRegisterLocationForm = {
    controls: {
        siteNameLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'siteName'
            },
            value: 'Site name',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        siteName: {
            elementType: 'input',
            elementConfig: {
                id: 'siteName',
                type: 'text',
                spellCheck: 'false',
                placeholder: 'Enter site name'
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
        areaLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'area'
            },
            value: 'Site area',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        area: {
            elementType: 'input',
            elementConfig: {
                id: 'area',
                type: 'text',
                spellCheck: 'false',
                placeholder: 'Enter site area'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
                maxLength: 50
            },
            visible: true,
            valid: false,
            touched: false
        },
        subAreaLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'subArea'
            },
            value: 'Site sub area',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        subArea: {
            elementType: 'input',
            elementConfig: {
                id: 'subArea',
                type: 'text',
                spellCheck: 'false',
                placeholder: 'Enter site sub area'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
                maxLength: 50
            },
            visible: true,
            valid: false,
            touched: false
        }
    },
    formIsValid: false
}

export const riskRegisterWhoAreYouForm = {
    controls: {
        displayNameLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'displayName'
            },
            value: 'Display name',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        displayName: {
            elementType: 'input',
            elementConfig: {
                id: 'displayName',
                type: 'text',
                spellCheck: 'false',
                placeholder: 'Enter display name'
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
        emailLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'email'
            },
            value: 'Email address',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        email: {
            elementType: 'input',
            elementConfig: {
                id: 'email',
                type: 'email',
                spellCheck: 'false',
                autoComplete: 'email',
                placeholder: 'Enter email address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
                maxLength: 256
            },
            visible: true,
            valid: false,
            touched: false
        },
        phoneLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'phone'
            },
            value: 'Phone number',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        phone: {
            elementType: 'input',
            elementConfig: {
                id: 'phone',
                type: 'phone',
                spellCheck: 'false',
                autoComplete: 'phone',
                placeholder: 'Enter phone number'
            },
            value: '',
            validation: {
                required: true,
                isPhoneNumber: true
            },
            visible: true,
            valid: false,
            touched: false
        },
    },
    formIsValid: false
}