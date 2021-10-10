import { useReducer, useCallback } from "react";
import {updateObject, filterArray} from '../shared/utility';

const initialState = {
    areas: [],
    unfilteredSuggestAreas: [],
    suggestAreas: []
}

const reducer = (state, action) => {

    switch (action.type) {
        case 'ADD_AREA':
            return updateObject(state, {
                areas: action.areas,
                suggestAreas: action.suggestAreas
            });
        case 'REMOVE_AREA':
            return updateObject(state, {
                areas: action.areas,
                suggestAreas: action.suggestAreas
            });
        case 'FILTER_AREAS':
            return updateObject(state, {
                unfilteredSuggestAreas: action.unfilteredSuggestAreas,
                suggestAreas: action.suggestAreas
            });
        
        default:
            return state;
    }
}

const useOrganisationAreas = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const addArea = useCallback(item => {
        let areas = [...state.areas];
        areas.push(item);
        dispatch({
            type: 'ADD_AREA',
            areas: areas,
            suggestAreas: filterArray(state.unfilteredSuggestAreas, areas)
        });
    },[state.unfilteredSuggestAreas, state.areas]);

    const removeArea = useCallback(item => {
        dispatch({
            type: 'REMOVE_AREA',
            areas: filterArray(state.areas, [item]),
            suggestAreas: filterArray(state.unfilteredSuggestAreas, filterArray(state.areas, [item]))
        });
    }, [state.unfilteredSuggestAreas, state.areas]);

    const setSuggestAreas = useCallback((organisationAreas) => {
        
        dispatch({
            type: 'FILTER_AREAS',
            unfilteredSuggestAreas: organisationAreas,
            suggestAreas: filterArray(organisationAreas, state.areas)
        });
    }, [state.areas]);

    return {
        areas: state.areas,
        unfilteredSuggestAreas: state.unfilteredSuggestAreas,
        suggestAreas: state.suggestAreas,
        addArea: addArea,
        removeArea: removeArea,
        setSuggestAreas: setSuggestAreas
    }
};

export default useOrganisationAreas;