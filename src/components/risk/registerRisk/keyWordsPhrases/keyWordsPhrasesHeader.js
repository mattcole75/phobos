import React, {useEffect, useState, useCallback, useRef} from 'react';
import * as action from '../../../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';

const keyWordsAndPhrasesHeader = React.memo((props) => {

    const {wordPhraseSearchTextHandler} = props;

    const [enteredWordPhrase, setEnteredWordPhrase] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef();

    const idToken = useSelector(state => state.auth.idToken);
    // const keyWordsPhrases = useSelector(state => state.risk.keyWordsPhrases);

    const getIntelliVerseRecommendations = useCallback((idToken, identifier, param, universe) => {
        dispatch(action.intelliVerseSendRequest('/ivIntelliSuggest', 'GET', null, idToken, identifier, param, universe))
    },[dispatch]);

    const stateReset = useCallback(() => {
        dispatch(action.intelliVerseStateReset())
    },[dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
          if(enteredWordPhrase === inputRef.current.value) {
              stateReset();
              wordPhraseSearchTextHandler(enteredWordPhrase);
              getIntelliVerseRecommendations(idToken, 'GET_RECOMMENDED_KEY_WORDS_PHRASES', enteredWordPhrase, 'risk');   
          }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
      }, [enteredWordPhrase, getIntelliVerseRecommendations, idToken, inputRef, stateReset, wordPhraseSearchTextHandler]);

    return (
        <div className="register-risk__header-item">
            <label className="form__label">Key words and phrases</label>
            <input
                className="form__input"
                ref={inputRef}
                type="text"
                maxLength="50"
                placeholder="What's on your mind?"
                value={enteredWordPhrase}
                onChange={event => setEnteredWordPhrase(event.target.value)}
            />
        </div>
    );

});

export default keyWordsAndPhrasesHeader;