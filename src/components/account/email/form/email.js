import React, {useEffect, useState, useCallback} from 'react';
import Input from '../../../ui/input/input';
import useForms from '../../../../hooks/useForm';
import {emailForm} from '../../../ui/input/forms/authentication';
import {checkValidity} from '../../../../shared/utility';

const email = React.memo(props => {

    const {status, formConfig, setFormConfig} = useForms();
    const [form, setForm] = useState(<p>spinner</p>);

    const inputChangedHandler = useCallback((event, controlName) => {

        const updatedControls = {
            controls: {
                ...formConfig.controls,
                [controlName]: {
                    ...formConfig.controls[controlName],
                    value: event.target.value,
                    valid: checkValidity(event.target.value, formConfig.controls[controlName].validation),
                    touched: true
                }
            }
        };

        let formIsValid = true;
        for (let inputIdentifier in updatedControls.controls) {
            formIsValid = updatedControls.controls[inputIdentifier].valid && formIsValid;
        }

        updatedControls["formIsValid"] = formIsValid;

        setFormConfig(updatedControls);

    }, [formConfig, setFormConfig]);

    useEffect(() => {

        if(!formConfig)
            setFormConfig(emailForm, {email: props.email});
            
    }, [formConfig, props.email, setFormConfig]);

    const {idToken, localId, changeAccountHandler} = props;

    useEffect(() => {

        if(status === 'set' || status === 'update') {
            
            const formElementsArray = [];
            for (let key in formConfig.controls) {
                formElementsArray.push({
                    id: key,
                    config: formConfig.controls[key]
                });
            }

            setForm(formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                    clicked={() => changeAccountHandler({
                        localId: localId,
                        email: formConfig.controls.email.value
                    }, idToken, 'EMAIL_CHANGE')}
                    formIsValid={formConfig.formIsValid}/>
            )));
        }
        
    }, [status, formConfig, inputChangedHandler, changeAccountHandler, idToken, localId]);

    return (
        <div className="account__align">
            {form}
        </div>
    )

});

export default email;