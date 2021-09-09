import React from 'react';

const keyWordsPhrasesSelected = (props) => {

    const {keyWordPhrase, removeKeyWordPhraseHandler} = props;

    const submitHandler = () => {
        removeKeyWordPhraseHandler(keyWordPhrase);
    }

    return (
        <div className="register-risk__list-container">
            <div className="register-risk__list-item">
                <p className="paragraph">{keyWordPhrase.result}</p>
            </div>
            <div>
                <button className="btn btn--orange register-risk__list-item--button"
                onClick={submitHandler}>Remove</button>
            </div>
        </div>
    )

}

export default keyWordsPhrasesSelected;