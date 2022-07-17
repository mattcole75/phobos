import React from 'react';

const doubleRange = (props) => {

    const { config, setConfig } = props;

    const changeUnMitigatedValueHandler = (event) => {
        setConfig({
            ...config,
            unmitigated: event.target.value
        });
    };

    const changeMitigatedValueHandler = (event) => {
        setConfig({
            ...config,
            mitigated: event.target.value
        });
    };

    return (
        <div>
            <div className='range double-range'>
                <input
                    type="range"
                    min={config.min} 
                    max={config.max}
                    step={config.step}
                    value={config.unmitigated}
                    onChange={event => changeUnMitigatedValueHandler(event)} />
                <input
                    type="range"
                    min={config.min} 
                    max={config.max}
                    step={config.step}
                    value={config.mitigated}
                    onChange={event => changeMitigatedValueHandler(event)} />
            </div>
            <div><p><strong>Un-mitigated: </strong>{config[config.unmitigated].description}</p></div>
            <div><p><strong>Mitigated: </strong>{config[config.mitigated].description}</p></div>
        </div> 
    )
}

export default doubleRange;