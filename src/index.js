import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import App from './App';

import authReducer from './store/reducers/auth';
import riskReducer from './store/reducers/risk';

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