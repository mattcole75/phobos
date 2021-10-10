import {useReducer, useCallback} from 'react';
import {updateObject, filterIntelliverseArray} from '../shared/utility';

const initialState = {
    keyWordsPhrases: [],
    unfilteredSuggestKeyWordsPhrases: [],
    suggestKeyWordsPhrases: []
}

const reducer = (state, action) => {

    switch (action.type) {
        case 'ADD_WORD_PHRASE':
            return updateObject(state, {
                keyWordsPhrases: action.keyWordsPhrases,
                suggestKeyWordsPhrases:action.suggestKeyWordsPhrases
            });
        case 'REMOVE_WORD_PHRASE':
            return updateObject(state, {
                keyWordsPhrases: action.keyWordsPhrases,
                suggestKeyWordsPhrases:action.suggestKeyWordsPhrases
            });
        case 'FILTER_INTILLIVERSE_SUGGEST':
            return updateObject(state, {
                unfilteredSuggestKeyWordsPhrases: action.unfilteredSuggestKeyWordsPhrases,
                suggestKeyWordsPhrases: action.suggestKeyWordsPhrases
            });
        
        default:
            return state;
    }
}

const useKeyWordsPhrases = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const addKeyWordPhrase = useCallback(item => {
        let wordsPhrases = [...state.keyWordsPhrases];
        wordsPhrases.push(item);
        dispatch({
            type: 'ADD_WORD_PHRASE',
            keyWordsPhrases: wordsPhrases,
            suggestKeyWordsPhrases: filterIntelliverseArray(state.unfilteredSuggestKeyWordsPhrases, wordsPhrases)
        });
    },[state.keyWordsPhrases, state.unfilteredSuggestKeyWordsPhrases]);

    const removeKeyWordPhrase = useCallback(item => {

        dispatch({
            type: 'REMOVE_WORD_PHRASE',
            keyWordsPhrases: filterIntelliverseArray(state.keyWordsPhrases, [item]),
            suggestKeyWordsPhrases: filterIntelliverseArray(state.unfilteredSuggestKeyWordsPhrases, filterIntelliverseArray(state.keyWordsPhrases, [item]))
        });
    }, [state.keyWordsPhrases, state.unfilteredSuggestKeyWordsPhrases]);

    const setSuggestKeyWordsPhrases = useCallback((intelliVerseSuggest) => {
        dispatch({
            type: 'FILTER_INTILLIVERSE_SUGGEST',
            unfilteredSuggestKeyWordsPhrases: intelliVerseSuggest,
            suggestKeyWordsPhrases: filterIntelliverseArray(intelliVerseSuggest, state.keyWordsPhrases)
        });
    }, [state.keyWordsPhrases]);

    return {
        keyWordsPhrases: state.keyWordsPhrases,
        unfilteredSuggestKeyWordsPhrases: state.unfilteredSuggestKeyWordsPhrases,
        suggestKeyWordsPhrases: state.suggestKeyWordsPhrases,
        addKeyWordPhrase: addKeyWordPhrase,
        removeKeyWordPhrase: removeKeyWordPhrase,
        setSuggestKeyWordsPhrases: setSuggestKeyWordsPhrases
    }
};

export default useKeyWordsPhrases;