import { SET_PUBLIC_URLS, SET_PRIVATE_URLS } from '../actions/types';

const initialState = {
    publicUrls: [],
    privateUrls: []
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_PUBLIC_URLS:
            return {
                ...state,
                publicUrls: action.payload
            }
        case SET_PRIVATE_URLS:
                return {
                    ...state,
                    privateUrls: action.payload
                }
        default: 
            return state;
    }
}