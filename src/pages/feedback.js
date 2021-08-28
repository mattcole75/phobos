import React from 'react';
import Feedback from '../components/feedbackItems/feedbackItems';

const feedback = React.memo(() => {
    return (
        <Feedback limit={20}/>
    )
});

export default feedback;