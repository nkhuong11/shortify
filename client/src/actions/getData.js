import { SET_PUBLIC_URLS, SET_PRIVATE_URLS } from './types';


export const setPublicUrls = urlList => {
    return {
        type: SET_PUBLIC_URLS,
        payload: urlList
    }
}

export const setPrivateUrls = urlList => {
    return {
        type: SET_PRIVATE_URLS,
        payload: urlList
    }
}