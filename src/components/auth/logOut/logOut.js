import React, {useEffect, useState} from 'react';
import useForm from '../../../hooks/useForm';
import Input from '../../ui/input/input';
import {logOutForm} from '../../ui/input/forms/authentication';

const logOut = React.memo(props => {

    const {status, formConfig, setFormConfig} = useForm();
    const [form, setForm] = useState(<p>spinner</p>);

    useEffect(() => {

        if(!formConfig)
            setFormConfig(logOutForm);
            
    }, [formConfig, setFormConfig]);

    const {logOutHandler} = props;

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
                    clicked={() => logOutHandler()}
                    formIsValid={formConfig.formIsValid}/>
            )));
        }
        
    }, [status, formConfig, logOutHandler]);

    return (

        <div>
            {form}
        </div>
    )

});

export default logOut;