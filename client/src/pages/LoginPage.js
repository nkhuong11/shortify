import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';

import {setLoggedIn} from '../actions/authentication'
import setAuthToken from '../services/setAuthToken';

import "./css/LoginRegisterPage.css";

function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        
        axios({
            method: 'post',
            url: '/api/user/login',
            data: {
              email: email,
              password: password
            }})
            .then(res => {
                const { token } = res.data;
                const decoded = jwt_decode(token);
                localStorage.setItem('jwtToken', token);
                localStorage.setItem('_id', decoded._id);
                setAuthToken(token);
                
                props.setLoggedIn(decoded);
                props.history.push('/');
            })
            .catch(error => console.log(error));

    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="input-group">
                <div className="form-group">    
                    <input
                        type="email"
                        placeholder="Email"
                        autoFocus
                        name="email"
                        onChange={ e => setEmail(e.target.value)}
                        value={ email }/>
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={ e => setPassword(e.target.value)}
                        value={ password }/>
                </div>
            
                <div className="form-group">
                    <button type="submit" className="auth-button">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}


const mapStateToProps = state => {
    return {
      auth: state.auth
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        setLoggedIn: decode => {
        dispatch(setLoggedIn(decode));
        }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);