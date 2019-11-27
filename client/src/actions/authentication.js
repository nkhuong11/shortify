import { LOGGED_IN, LOGGED_OUT } from './types';

export const setLoggedIn = decoded => {
    return {
        type: LOGGED_IN,
        payload: decoded
    }
}

export const setLoggedOut = decoded => {
    return {
        type: LOGGED_OUT,
        payload: decoded
    }
}




