import React, { useState } from 'react';
import axios from 'axios';

import "./css/LoginRegisterPage.css"

export default function RegisterPage(props) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        axios({
            method: 'post',
            url: '/api/user/register',
            data: {
                username: username,
                email: email,
                password: password
            }})
            .then(res => {
                if (res.status === 200) {
                    alert('Reister Successful');
                    props.history.push('/login');
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="input-group">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Username"
                        autoFocus
                        name="username"
                        onChange={ e => setUsername(e.target.value)}
                        value={ username }/>
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
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
                    value={ password }
                    />
                </div>
            
                <div className="form-group">
                    <button type="submit" className="auth-button">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}