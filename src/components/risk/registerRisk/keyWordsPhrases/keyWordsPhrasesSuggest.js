import React from 'react';

const keyWordsPhrasesSuggest = (props) => {

    const {ivSuggest, addKeyWordPhraseHandler} = props;

    const submitHandler = () => {
        addKeyWordPhraseHandler(ivSuggest);
    }

    return (
        <div className="register-risk__list-container">
            <div className="register-risk__list-item">
                <p className="paragraph">{ivSuggest.result}</p>
            </div>
            <div>
                <button className="btn register-risk__list-item--button"
                onClick={submitHandler}>Add</button>
            </div>
        </div>
    )
}

export default keyWordsPhrasesSuggest;