import {useReducer, useCallback} from 'react';
import {updateObject, filterArray} from '../shared/utility';

const initialState = {
    locations: [],
    unfilteredSuggestLocation: [],
    suggestLocations: []
}

const reducer = (state, action) => {

    switch (action.type) {
        case 'ADD_LOCATION':
            return updateObject(state, {
                locations: action.locations,
                suggestLocations: action.suggestLocations
            });
        case 'REMOVE_LOCATION':
            return updateObject(state, {
                locations: action.locations,
                suggestLocations: action.suggestLocations
            });
        case 'FILTER_INTILLIVERSE_SUGGEST':
            return updateObject(state, {
                unfilteredSuggestLocation: action.unfilteredSuggestLocation,
                suggestLocations: action.suggestLocations
            });
        
        default:
            return state;
    }
}

const useKeyWordsPhrases = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const addLocation = useCallback(item => {
        let locations = [...state.locations];
        locations.push(item);
        dispatch({
            type: 'ADD_LOCATION',
            locations: locations,
            suggestLocations: filterArray(state.unfilteredSuggestLocation, locations)
        });
    },[state.unfilteredSuggestLocation, state.locations]);

    const removeLocation = useCallback(item => {
        dispatch({
            type: 'REMOVE_LOCATION',
            locations: filterArray(state.locations, [item]),
            suggestLocations: filterArray(state.unfilteredSuggestLocation, filterArray(state.locations, [item]))
        });
    }, [state.unfilteredSuggestLocation, state.locations]);

    const setSuggestLocation = useCallback((intelliVerseSuggest) => {
        dispatch({
            type: 'FILTER_INTILLIVERSE_SUGGEST',
            unfilteredSuggestLocation: intelliVerseSuggest,
            suggestLocations: filterArray(intelliVerseSuggest, state.locations)
        });
    }, [state.locations]);

    return {
        locations: state.locations,
        unfilteredSuggestLocation: state.unfilteredSuggestLocation,
        suggestLocations: state.suggestLocations,
        addLocation: addLocation,
        removeLocation: removeLocation,
        setSuggestLocation: setSuggestLocation
    }
};

export default useKeyWordsPhrases;