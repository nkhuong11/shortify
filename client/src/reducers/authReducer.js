import { LOGGED_IN, LOGGED_OUT } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case LOGGED_IN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGGED_OUT:
                return {
                    ...state,
                    isAuthenticated: false,
                    user: action.payload
                }
        default: 
            return state;
    }
}