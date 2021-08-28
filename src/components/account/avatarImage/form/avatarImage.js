import React, { useEffect, useState, useCallback } from 'react';
import Input from '../../../ui/input/input';
import useForms from '../../../../hooks/useForm';
import { imageUploadForm } from '../../../ui/input/forms/authentication';
import { checkValidity } from '../../../../shared/utility';

const avatarImage = React.memo(props => {

    const { status, formConfig, setFormConfig } = useForms(); 
    const [ form, setForm ] = useState(<span>spinner</span>);
    const [ image, setImage ] = useState(null);

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

        if(event.target.files[0]){
            const image = event.target.files[0];
            setImage(image);
        }


    }, [formConfig, setFormConfig]);

    useEffect(() => {
        if(!formConfig)
            setFormConfig(imageUploadForm);
            
    }, [formConfig, setFormConfig]);

    const {idToken, localId, changeAvatarHandler} = props;

    const saveHandler = useCallback(() => {

        if(image) {
            let formData = new FormData();
            formData.append('avatar', image);

            changeAvatarHandler(formData, idToken, localId, 'AVATAR_IMAGE_CHANGE');
        }
        else {
            changeAvatarHandler(null, idToken, localId, 'AVATAR_IMAGE_CHANGE');
        }
        

    }, [changeAvatarHandler, idToken, image, localId]);

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
                    clicked={() => saveHandler()}
                    formIsValid={formConfig.formIsValid} />
            )));
        }
        
    }, [status, formConfig, inputChangedHandler, changeAvatarHandler, localId, idToken, saveHandler]);

    return (
        <div className="account__align">
            <div>
                {form}
            </div>
            <label className="form__label">Press save with no file chosen to use system default</label>
        </div>
    )

});

export default avatarImage;