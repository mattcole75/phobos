import React, {useEffect, useState, useCallback} from 'react';
import Input from '../../../ui/input/input';
import useForms from '../../../../hooks/useForm';
import {passwordForm} from '../../../ui/input/forms/authentication';
import {checkValidity, hashPassword} from '../../../../shared/utility';

const password = React.memo(props => {

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
            setFormConfig(passwordForm);
            
    }, [formConfig, setFormConfig]);

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
                        password: hashPassword(formConfig.controls.password.value)
                    }, idToken, 'PASSWORD_CHANGE')}
                    formIsValid={formConfig.formIsValid}/>
            )));
        }
        
    }, [status, formConfig, inputChangedHandler, idToken, changeAccountHandler, localId]);

    return (
        <div className="account__align">
            {form}
        </div>
    )

});

export default password;