import React, { useState, useEffect, useCallback } from 'react';
import Input from '../../ui/input/input';
import useForms from '../../../hooks/useForm';
import { addFeedbackForm } from '../../ui/input/forms/feedback';
import { checkValidity } from '../../../shared/utility';

const addFeedbackItem = React.memo((props) => {

    const {status, formConfig, setFormConfig} = useForms();
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
            setFormConfig(addFeedbackForm);
            
    }, [formConfig, setFormConfig]);

    const {localId, saveFeedbackHandler} = props;

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
                    clicked={() => saveFeedbackHandler({
                        localId: localId,
                        title: formConfig.controls.title.value,
                        feedback: formConfig.controls.feedback.value
                    }, 'POST_FEEDBACK')}
                    formIsValid={formConfig.formIsValid} />
            )));
        }
        
    }, [status, formConfig, inputChangedHandler, saveFeedbackHandler, localId]);

    return (
        <div className="popup">
            <div className="popup__content">
                <div className="popup__dialogue">
                    <button
                        className="popup__close btn btn--orange"
                        onClick={props.toggleFeedbackForm}
                    >&times;</button>
                    <div className="u-margin-bottom-medium">
                        <h2 className="heading-secondary">
                            Feedback
                        </h2>
                    </div>
                    {form}
                </div>
            </div>
        </div>
    )
});

export default addFeedbackItem;