import React, {useEffect, useState, useCallback, useRef} from 'react';
import * as action from '../../../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';

const affectedAreasHeader = React.memo((props) => {

    const {areaTextHandler} = props;
    const [enteredArea, setEnteredArea] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef();

    const idToken = useSelector(state => state.auth.idToken);

    const getOrganisationAreas = useCallback((idToken, identifier, param) => {
        dispatch(action.organisationSendRequest('/organisationarea', 'GET', null, idToken, identifier, param))
    },[dispatch]);

    // const stateReset = useCallback(() => {
    //     dispatch(action.organisationStateReset())
    // },[dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
          if(enteredArea === inputRef.current.value) {
            //   stateReset();
              areaTextHandler(enteredArea);
              getOrganisationAreas(idToken, 'GET_ORGANISATION_AREAS', enteredArea);
          }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
      }, [enteredArea, getOrganisationAreas, idToken, inputRef, areaTextHandler]);

    return (
        <div className="register-risk__panel-item">
            <label className="form__label">Organisation Areas</label>
            <input
                className="form__input"
                ref={inputRef}
                type="text"
                maxLength="50"
                placeholder="What areas are affected?"
                value={enteredArea}
                onChange={event => setEnteredArea(event.target.value)}
            />
        </div>
    );

});

export default affectedAreasHeader;