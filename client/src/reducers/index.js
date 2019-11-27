import { combineReducers } from 'redux';

import authReducer from './authReducer';
import urlItemsReducer from './urlItemsReducer';


export default combineReducers({
    auth: authReducer,
    urlItems: urlItemsReducer,
});