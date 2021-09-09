import React, {useCallback, useEffect, useState} from 'react';
import LocationHeader from './location/locationHeader';
import LocationSelector from './location/locationSelector';
import KeyWordsPhrasesHeader from './keyWordsPhrases/keyWordsPhrasesHeader';
import KeyWordsPhrasesSelector from './keyWordsPhrases/keyWordPhraseSelector';
import LikelihoodImpactHeader from './likelihoodImpact/likelihoodImpactHeader';
import useKeyWordsPhrases from '../../../hooks/useKeyWordsPhrases';
import useLocations from '../../../hooks/useLocations';
import {useSelector} from 'react-redux';
// import * as action from '../../../store/actions/index';
// import ErrorModal from '../../ui/errorModal/errorModal';
// import Spinner from '../../ui/spinner/spinner';


const registerRisk = React.memo((props) => {

    // const loading = useSelector(state => state.risk.loading);
    // const error = useSelector(state => state.risk.error);
    // const identifier = useSelector(state => state.risk.identifier);
    // const riskData = useSelector(state => state.risk.data);

    // const dispatch = useDispatch();

    //const onPostRisk = useCallback((riskData, identifier) => dispatch(action.riskSendRequest('/risk.json?auth=' + idToken,'POST', riskData, null, identifier, null)),[dispatch, idToken]);
    //const onSetRisk = useCallback((riskData, identifier) => dispatch(action.riskSendRequest('/risk.json?auth=' + idToken,'SET', riskData, null, identifier, null)), [dispatch, idToken]);
    
    const {keyWordsPhrases, suggestKeyWordsPhrases, addKeyWordPhrase, removeKeyWordPhrase, setSuggestKeyWordsPhrases} = useKeyWordsPhrases();
    const {locations, suggestLocations, addLocation, removeLocation, setSuggestLocation} = useLocations();

    const intelliVerse = useSelector(state => state.intelliVerse.data);
    const identifier = useSelector(state => state.intelliVerse.identifier);

    const [wordPhraseSearchText, setWordPhraseSearchText] = useState('');
    const [locationSearchText, setLocationSearchText] = useState('');

    const wordPhraseSearchTextHandler = useCallback((wordPhrase) => {
        setWordPhraseSearchText(wordPhrase);
    }, []);

    const locationTextHandler = useCallback((wordPhrase) => {
        setLocationSearchText(wordPhrase);
    }, []);

    const addKeyWordPhraseHandler = useCallback((wordPhrase) => {
        addKeyWordPhrase(wordPhrase);
        setWordPhraseSearchText('');
    }, [addKeyWordPhrase]);

    const removeKeyWordPhraseHandler = useCallback((wordPhrase) => {
        removeKeyWordPhrase(wordPhrase);
    }, [removeKeyWordPhrase]);

    const addLocationHandler = useCallback((location) => {
        addLocation(location);
        setLocationSearchText('');
    }, [addLocation]);

    const removeLocationHandler = useCallback((location) => {
        removeLocation(location);
    }, [removeLocation]);

    useEffect(() => {
        if(intelliVerse && identifier === 'GET_RECOMMENDED_KEY_WORDS_PHRASES'){
            setSuggestKeyWordsPhrases([...intelliVerse.intelliSuggest]);
        }

        if(intelliVerse && identifier === 'GET_RECOMMENDED_LOCATIONS'){
            setSuggestLocation([...intelliVerse.intelliSuggest]);
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[intelliVerse, keyWordsPhrases, identifier]);
        
    return (

        <section className="section-registerRisk">
            <div className="u-margin-bottom-medium u-centre-text">
                <h2 className="heading-secondary">
                    Raising a risk?
                </h2>
            </div>

            <div className="row register-risk">

                <div className="col-one-third register-risk__gutter--override">
                    <div className="register-risk__header">
                        <LocationHeader locationTextHandler={locationTextHandler}/>
                        <LocationSelector
                            locationSearchText={locationSearchText}
                            locations={locations}
                            suggestLocations={suggestLocations} 
                            addLocationHandler={addLocationHandler}
                            removeLocationHandler={removeLocationHandler} 
                            />
                    </div>
                </div>

                <div className="col-one-third register-risk__gutter--override">
                    <div className="register-risk__header">
                        <KeyWordsPhrasesHeader wordPhraseSearchTextHandler={wordPhraseSearchTextHandler} />
                        <KeyWordsPhrasesSelector
                            wordPhraseSearchText={wordPhraseSearchText}
                            keyWordsPhrases={keyWordsPhrases}
                            suggestKeyWordsPhrases={suggestKeyWordsPhrases} 
                            addKeyWordPhraseHandler={addKeyWordPhraseHandler}
                            removeKeyWordPhraseHandler={removeKeyWordPhraseHandler} />
                    </div>
                </div>

                <div className="col-one-third register-risk__gutter--override">
                    <div className="register-risk__header">
                        <LikelihoodImpactHeader />
                    </div>
                </div>
            </div>
        </section>

    );
});

export default registerRisk;;