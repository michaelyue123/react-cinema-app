import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducers from './reducers';

const initialState = {};
const loggerMiddleware = createLogger();
const middleware = [thunkMiddleware, loggerMiddleware];

const store = createStore(rootReducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
