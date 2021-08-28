export const signUpForm = {
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
                placeholder: 'Create display name',
                required: true
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
                placeholder: 'Enter email address',
                required: true
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
        passwordLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'password'
            },
            value: 'Password',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        password: {
            elementType: 'input',
            elementConfig: {
                id: 'password',
                type: 'password',
                placeholder: 'Create password',
                autoComplete: 'on'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
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
            value: 'Create your Phobos account',
            visable: true,
            valid: true,
            touched: true
        }
    },
    formIsValid: false
}

export const signInForm = {
    controls: {
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
                placeholder: 'Enter email address',
                required: true
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            visible: true,
            valid: false,
            touched: false
        },
        passwordLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'password'
            },
            value: 'Password',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        password: {
            elementType: 'input',
            elementConfig: {
                id: 'password',
                type: 'password',
                placeholder: 'Enter password',
                autoComplete: 'on',
                required: true
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
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
            value: 'Log in',
            visable: true,
            valid: true,
            touched: true
        }
    },
    formIsValid: false
}

export const logOutForm = {
    controls: {
        submitButton: {
            elementType: 'button',
            elementConfig: {
                id: 'submit',
                type: 'button'
            },
            value: 'Log out',
            visable: true,
            valid: true,
            touched: true
        }
    },
    formIsValid: true
}

export const forgotForm = {
    controls: {
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
                maxLength: 256,
                isEmail: true
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
            value: 'Send me a password reset link',
            visable: true,
            valid: true,
            touched: true
        }
    },
    formIsValid: true
}

export const displayNameForm = {
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
                maxLength: 50,
                spellCheck: 'false',
                placeholder: 'Your display name'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
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
            value: 'Save display name',
            visable: true,
            valid: true,
            touched: true
        }
    },
    formIsValid: false
}

export const emailForm = {
    controls: {
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
                maxLength: 256,
                isEmail: true
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
            value: 'Save email',
            visable: true,
            valid: true,
            touched: true
        }
    },
    formIsValid: false
}

export const passwordForm = {
    controls: {
        passwordLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'password'
            },
            value: 'Password',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        password: {
            elementType: 'input',
            elementConfig: {
                id: 'password',
                type: 'password',
                placeholder: 'Your password',
                autoComplete: 'on'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
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
            value: 'Save password',
            visable: true,
            valid: true,
            touched: true
        }
    },
    formIsValid: false
}

export const imageUploadForm = {
    controls: {
        displayNameLabel: {
            elementType: 'label',
            elementConfig: {
                type: 'label',
                htmlFor: 'avatar'
            },
            value: 'Display name',
            validation: {
                required: false
            },
            visible: true,
            valid: true,
            touched: true
        },
        avatar: {
            elementType: 'input',
            elementConfig: {
                id: 'avatar',
                type: 'file'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        submitButton: {
            elementType: 'button',
            elementConfig: {
                id: 'submit',
                type: 'button'
            },
            value: 'Save display image',
            visable: true,
            valid: true,
            touched: true
        }
    },
    formIsValid: true
}