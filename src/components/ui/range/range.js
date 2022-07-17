import React from 'react';

const range = (props) => {

    const { config, setConfig } = props;

    const changeHandler = (event) => {
        setConfig({
            ...config,
                value: event.target.value
        });
    };

    return (
        <div className='range text-center'>
            <input
                className='mb-5'
                type="range" 
                min={config.min} 
                max={config.max}
                step={config.step}
                value={config.value}
                onChange={event => changeHandler(event)} />
            <span>{config[config.value].description}</span>
        </div>
    );

}   ;

export default range;