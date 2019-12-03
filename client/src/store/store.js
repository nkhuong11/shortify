import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';

const inititalState = {};

const store = createStore(
    rootReducer, 
    inititalState, 
);

export default store;