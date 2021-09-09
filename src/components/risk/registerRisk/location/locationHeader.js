import React, {useEffect, useState, useCallback, useRef} from 'react';
import * as action from '../../../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';

const locationHeader = React.memo((props) => {

    const {locationTextHandler} = props;
    const [enteredLocation, setEnteredLocation] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef();

    const idToken = useSelector(state => state.auth.idToken);

    const getIntelliVerseRecommendations = useCallback((idToken, identifier, param, universe) => {
        dispatch(action.intelliVerseSendRequest('/ivIntelliSuggest', 'GET', null, idToken, identifier, param, universe))
    },[dispatch]);

    const stateReset = useCallback(() => {
        dispatch(action.intelliVerseStateReset())
    },[dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
          if(enteredLocation === inputRef.current.value) {
              stateReset();
              locationTextHandler(enteredLocation);
              getIntelliVerseRecommendations(idToken, 'GET_RECOMMENDED_LOCATIONS', enteredLocation, 'location');   
          }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
      }, [enteredLocation, getIntelliVerseRecommendations, idToken, inputRef, locationTextHandler, stateReset]);

    return (
        <div className="register-risk__header-item">
            <label className="form__label">Location</label>
            <input
                className="form__input"
                ref={inputRef}
                type="text"
                maxLength="50"
                placeholder="Where could this happen?"
                value={enteredLocation}
                onChange={event => setEnteredLocation(event.target.value)}
            />
        </div>
    );

});

export default locationHeader;