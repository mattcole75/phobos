import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import App from './App';

import authReducer from './store/reducers/auth';
import riskReducer from './store/reducers/risk';

// import feedbackReducer from './store/reducers/feedback';
// import intelliVerse from './store/reducers/intelliVerse';
// import organisation from './store/reducers/organisation';
// import location from './store/reducers/location';

const store = configureStore({
    reducer: {
        auth: authReducer,
        risk: riskReducer,
    }
});

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

const root = createRoot(document.getElementById('root'));

root.render(app);