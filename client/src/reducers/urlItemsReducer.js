import { SET_PUBLIC_URLS, SET_PRIVATE_URLS } from '../actions/types';
// import isEmpty from '../services/is-empty';

const initialState = {
    publicUrls: [],
    privateUrls: []
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_PUBLIC_URLS:
            console.log(action.payload);
            return {
                ...state,
                publicUrls: action.payload
            }
        case SET_PRIVATE_URLS:
                console.log(action.payload);
                return {
                    ...state,
                    privateUrls: action.payload
                }
        default: 
            return state;
    }
}