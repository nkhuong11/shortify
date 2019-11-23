import axios from 'axios';
import { LOGGED_IN, LOGGED_OUT } from './types';
import setAuthToken from '../services/setAuthToken';
import jwt_decode from 'jwt-decode';


// export const registerUser = (user, history) => dispatch => {
//     axios.post('/api/user/register', user)
//             .then(res => history.push('/login'))
//             .catch(err => {
//                 dispatch({
//                     type: GET_ERRORS,
//                     payload: err.response.data
//                 });
//             });
// }

// export const loginUser =  (user) => dispatch => {
//     axios.post('/api/user/login', user)
//             .then(res => {
//                 const { token } = res.data;
//                 localStorage.setItem('jwtToken', token);
//                 setAuthToken(token);
//                 const decoded = jwt_decode(token);
//                 dispatch(setCurrentUser(decoded));
//             })
//             .catch(err => {
//                 dispatch({
//                     type: GET_ERRORS,
//                     payload: err.response.data
//                 });
//             });
// }

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




