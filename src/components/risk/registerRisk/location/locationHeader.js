import React, {useEffect, useState, useCallback, useRef} from 'react';
import * as action from '../../../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';

const locationHeader = React.memo((props) => {

    const {locationTextHandler, locations} = props;
    const [enteredLocation, setEnteredLocation] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef();

    const idToken = useSelector(state => state.auth.idToken);

    const getlocations = useCallback((idToken, identifier, param) => {
        dispatch(action.locationSendRequest('/location', 'GET', null, idToken, identifier, param))
    },[dispatch]);

    // const stateReset = useCallback(() => {
    //     dispatch(action.locationStateReset());
    // },[dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
          if(enteredLocation === inputRef.current.value) {
            //stateReset();
                locationTextHandler(enteredLocation);
                let param = '';
                if(locations.length > 0)
                    param = locations.at(-1).id;
                else
                    param = enteredLocation;

              getlocations(idToken, 'GET_LOCATIONS', param);
          }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
      }, [enteredLocation, getlocations, idToken, inputRef, locationTextHandler, locations]);

    return (
        <div className="register-risk__panel-item">
            <label className="form__label">Location</label>
            <input
                className="form__input"
                ref={inputRef}
                type="text"
                maxLength="50"
                placeholder={locations.length > 0 ? '' : 'Where could this happen?'}
                value={enteredLocation}
                onChange={event => setEnteredLocation(event.target.value)}
                disabled={locations.length > 0 ? true : false}
            />
        </div>
    );

});

export default locationHeader;