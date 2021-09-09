import React from 'react';
import LocationSuggest from './locationSuggest';
import LocationSelected from './locationSelected';

const locationSelector = React.memo(props => {

    const {locationSearchText, locations, suggestLocations, addLocationHandler, removeLocationHandler} = props;

    return (

        <div className="register-risk__form">
            {locationSearchText !== ''
                ? <div>
                    <label className="form__label">Current</label>
                    <ul>
                        <li>
                            <LocationSuggest ivSuggest={{result: locationSearchText, occurence: 0}} addLocationHandler={addLocationHandler}/>
                        </li>
                    </ul>
                </div>
                : null
            }
            {locations.length > 0
                ?   <div>
                        <label className="form__label">Selected</label>
                        <div>
                            <ul>
                                {locations.map(element => (
                                    <li key={element.result}>
                                        <LocationSelected location={element} removeLocationHandler={removeLocationHandler} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                : null
            }
            <div>
                <label className="form__label">
                    {locationSearchText === ''
                        ? 'Most used locations'
                        : 'Related locations' 
                    }
                    
                </label>
                <div>
                    <ul>
                        {suggestLocations.length > 0
                            ?   suggestLocations.map(element => (
                                    <li key={element.result}>
                                        <LocationSuggest ivSuggest={element} addLocationHandler={addLocationHandler}/>
                                    </li>
                                ))
                            : <li><p className="paragraph">No suggestions found</p></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
});

export default locationSelector;