import React from 'react';
import LocationSuggest from './locationSuggest';
import LocationSelected from './locationSelected';

const locationSelector = React.memo(props => {

    const {locationSearchText, locations, suggestLocations, addLocationHandler, removeLocationHandler} = props;

    return (

        <div className="register-risk__form">
            {locations.length > 0
                ?   <div>
                        <label className="form__label">Selected</label>
                        <div>
                            <ul>
                                {locations.map(element => (
                                    <li key={element.name}>
                                        <LocationSelected location={element} removeLocationHandler={removeLocationHandler} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                : null
            }
            <div>
                <label className="form__label">Related locations</label>
                <div>
                    <ul>
                        {suggestLocations.length > 0
                            ?   suggestLocations.map(element => (
                                    <li key={element.name}>
                                        <LocationSuggest location={element} addLocationHandler={addLocationHandler}/>
                                    </li>
                                ))
                            : <li><p className="paragraph">No locations found</p></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
});

export default locationSelector;