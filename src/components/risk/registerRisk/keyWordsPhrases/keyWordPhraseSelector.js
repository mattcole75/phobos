import React from 'react';
import KeyWordsPhrasesSuggest from './keyWordsPhrasesSuggest';
import KeyWordsPhrasesSelected from './keyWordsPhrasesSelected';

const keyWordPhraseSelector = React.memo(props => {

    const {wordPhraseSearchText,keyWordsPhrases, suggestKeyWordsPhrases, addKeyWordPhraseHandler, removeKeyWordPhraseHandler} = props;

    return (

        <div className="register-risk__form">
            {wordPhraseSearchText !== ''
                ? <div>
                    <label className="form__label">Current</label>
                    <ul>
                        <li>
                            <KeyWordsPhrasesSuggest ivSuggest={{result: wordPhraseSearchText, occurence: 0}} addKeyWordPhraseHandler={addKeyWordPhraseHandler}/>
                        </li>
                    </ul>
                </div>
                : null
            }
            {keyWordsPhrases.length > 0
                ?   <div>
                        <label className="form__label">Selected</label>
                        <div>
                            <ul>
                                {keyWordsPhrases.map(element => (
                                    <li key={element.result}>
                                        <KeyWordsPhrasesSelected keyWordPhrase={element} removeKeyWordPhraseHandler={removeKeyWordPhraseHandler} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                : null
            }
            <div>
                <label className="form__label">
                    {wordPhraseSearchText === ''
                        ? 'Most used words & phrases'
                        : 'Related words & phrases' 
                    }
                    
                </label>
                <div>
                    <ul>
                        {suggestKeyWordsPhrases.length > 0
                            ?   suggestKeyWordsPhrases.map(element => (
                                    <li key={element.result}>
                                        <KeyWordsPhrasesSuggest ivSuggest={element} addKeyWordPhraseHandler={addKeyWordPhraseHandler}/>
                                    </li>
                                ))
                            : <li><p className="paragraph">No suggestions found</p></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
});

export default keyWordPhraseSelector;