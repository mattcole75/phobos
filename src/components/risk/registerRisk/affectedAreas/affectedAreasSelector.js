import React from 'react';
import AreaList from './affectedAreaList';
import AreaSelected from './affectedAreaSelected';

const areaSelector = React.memo(props => {

    const {areaSearchText, areas, suggestAreas, addAreaHandler, removeAreaHandler} = props;

    return (

        <div className="register-risk__form">

            {areas.length > 0
                ?   <div>
                        <label className="form__label">Selected</label>
                        <div>
                            <ul>
                                {areas.map(element => (
                                    <li key={element.name}>
                                        <AreaSelected area={element} removeAreaHandler={removeAreaHandler} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                : null
            }
            <div>
            <label className="form__label">
                    {areaSearchText === ''
                        ? 'Organisation Areas'
                        : 'Related Organisational Areas' 
                    }
                    
                </label>
                <div>
                    <ul>
                        {suggestAreas.length > 0
                            ?   suggestAreas.map(element => (
                                    <li key={element.name}>
                                        <AreaList area={element} addAreaHandler={addAreaHandler}/>
                                    </li>
                                ))
                            : <li><p className="paragraph">No areas found</p></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
});

export default areaSelector;