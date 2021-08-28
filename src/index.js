import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';

import authReducer from './store/reducers/auth';
import feedbackReducer from './store/reducers/feedback';
import riskReducer from './store/reducers/risk';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const rootReducer = combineReducers({
    auth: authReducer,
    feedback: feedbackReducer,
    risk: riskReducer
});

const store = createStore(rootReducer, 
  composeEnhancers (
    applyMiddleware(thunk)
));

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));