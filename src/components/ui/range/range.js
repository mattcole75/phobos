import React from 'react';
import { updateObject } from '../../../shared/utility';

const range = React.memo(props => {

    const {config, setConfig} = props;
    
    // const [range, setRange] = useState(1);

    const changeHandler = (event) => {
        setConfig(
            updateObject(config, {
                value: event.target.value
            })
        );
    };

    return (
        <div className="register-risk__range range">
            <div className="register-risk__panel-item range">
            <label className="form__label">{config.label + ' - ' + config[config.value].title}</label>
                <input 
                    type="range" 
                    min={config.min} 
                    max={config.max}
                    step={config.step}
                    value={config.value} onChange={event => changeHandler(event)} />
                <span>{config[config.value].description}</span>
            </div>
            
        </div>
    );

    // --style='--min:0; --max:10000; --step:100; --value:200; --text-value:"200"; --prefix:"$"'
});

export default range;