import React, { useCallback, useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useLocation} from 'react-router-dom';
import * as action from '../../store/actions/index';
import Backdrop from '../ui/backdrop/backdrop';
import Spinner from '../ui/spinner/spinner';
import FeedbackItem from '../../components/feedbackItems/feedbackItem/feedbackItem';
import AddFeedbackItem from './addFeedbackItem/addFeedbackItem';
import { defaultAvatarUrl } from '../../configuration/defaults';
import Messages from '../ui/message/message';

const feedbackItems = React.memo((props) => {

    const loading = useSelector(state => state.feedback.loading);
    const error = useSelector(state => state.feedback.error);
    const identifier = useSelector(state => state.feedback.identifier);
    const data = useSelector(state => state.feedback.data);

    const localId = useSelector(state => state.auth.localId);
    const idToken = useSelector(state => state.auth.idToken);
    const isAuthenticated = useSelector(state => state.auth.idToken !== null);

    const dispatch = useDispatch();
    const getFeedbackItems = useCallback((identifier) => dispatch(action.feedbackSendRequest('/feedback', 'GET', null, null, identifier, props.limit)),[dispatch, props.limit]);
    const onSaveFeedback = useCallback((feedbackData, identifier) => dispatch(action.feedbackSendRequest('/feedback', 'POST', feedbackData, idToken, identifier)),[dispatch, idToken]);
    const onClearError = () => dispatch(action.feedbackErrorReset());
    
    const [showAddFeedbackForm, setShowAddFeedbackForm] = useState(false);

    const toggleFeedbackForm = useCallback(() => {
        setShowAddFeedbackForm(!showAddFeedbackForm);
    }, [showAddFeedbackForm]);

    const saveFeedbackHandler = useCallback((feedbackData, identifier) => {

        onSaveFeedback(feedbackData, identifier)

    }, [onSaveFeedback]);

    useEffect(() => {
        getFeedbackItems();
    },[getFeedbackItems]);

    useEffect(() => {
        if(identifier === 'POST_FEEDBACK') {
            getFeedbackItems();
            toggleFeedbackForm();
        }
    }, [getFeedbackItems, identifier, toggleFeedbackForm]);

    const location = useLocation();
    
    let spinner = null;
    if(loading)
        spinner = <Spinner />

    return (
        <section className="section-feedback">

            {error && <Messages close={onClearError}>{error}</Messages>}

            <Backdrop show={loading} />
            {spinner}

            {showAddFeedbackForm 
                ? <AddFeedbackItem 
                    localId={localId} 
                    saveFeedbackHandler={saveFeedbackHandler} 
                    toggleFeedbackForm={toggleFeedbackForm}/> 
                : null}

            <div className="u-centre-text u-margin-bottom-small">
                <h2 className="heading-secondary">
                    Phobos makes the difference
                </h2>
            </div>
            <div className="u-centre-text">
                {isAuthenticated
                    ? <button 
                        className="btn"
                        onClick={toggleFeedbackForm}>Add your own feedback</button>
                    : null}
            </div>

            {data && data.feedback ? data.feedback.map(item => (
                <FeedbackItem
                    key={item.id}
                    avatarUrl={item.avatarUrl ? item.avatarUrl : defaultAvatarUrl}
                    displayName={item.displayName}
                    title={item.title}
                    feedback={item.feedback}/>
            )) : null}

            {location.pathname === "/feedback" 
                ?   null
                :   <div className="u-centre-text u-margin-top-huge">
                        <NavLink
                            className="btn"
                            to="/feedback"
                            exact>See more feedback</NavLink>
                    </div>}
            
        </section>
    );
});

export default feedbackItems;