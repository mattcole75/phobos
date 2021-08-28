import React from 'react';

const input = (props) => {

    let inputElement = null;
    const inputStyles = ['form__input'];
    const labelStyles = ['form__label'];
    const buttonStyles = ['btn'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputStyles.push("form__invalid");
    }

    switch (props.elementType) {

        case 'input':
            inputElement = <input
                className={inputStyles.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        
        case 'textarea':
            inputElement = <textarea 
                className={inputStyles.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;

        case ('label'):
            inputElement = <label
                className={labelStyles.join(' ')}
                {...props.elementConfig}>{props.value}</label>
            break;
        
        case ('button'):
            inputElement = <button
            className={buttonStyles.join(' ')}
                {...props.elementConfig}
                onClick={props.clicked}
                disabled={!props.formIsValid}>{props.value}</button>
            break;
            
        default:
            inputElement = <input 
                className=""
                {...props.elementConfig} />
    }

    return (

        <div className="">
            {inputElement}
        </div>

    );

}

export default input;