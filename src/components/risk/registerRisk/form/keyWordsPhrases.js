import React, {useEffect, useState, useCallback} from 'react';
import Input from '../../../ui/input/input';
import useForm from '../../../../hooks/useForm';
import {keyWordsAndPhrasesForm} from '../../../ui/input/forms/risk';
import {checkValidity} from '../../../../shared/utility';

const keyWordsAndPhrases = React.memo((props) => {

    const {status, formConfig, setFormConfig} = useForm();
    const [form, setForm] = useState(<span>spinner</span>);

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
            setFormConfig(keyWordsAndPhrasesForm);
            
    }, [formConfig, setFormConfig]);

    const {saveRiskHandler} = props;

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
                    clicked={() => saveRiskHandler({
                        keyWordPhrase: formConfig.controls.keyWordPhrase.value
                    })}
                    formIsValid={formConfig.formIsValid} />
            )));
        }
        
    }, [status, formConfig, inputChangedHandler, saveRiskHandler]);

    return (
        <div className="riskForm__align">
            {form}
        </div>

    );

});

export default keyWordsAndPhrases;