import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import setAuthToken from '../services/setAuthToken';
import {setLoggedOut} from '../actions/authentication';
import './css/Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.auth);
    }

    onLogout(e) {
        e.preventDefault();

        axios({
            method: 'post',
            url: '/api/user/logout',
            data: {}})
            .then(res => {
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('_id');
                setAuthToken(false);
                this.props.setLoggedOut({});
                this.props.history.push('/login');
            })
            .catch(error => console.log(error)); 
    }

    render() {

        // const authLinks = (
        //     <ul className="navbar-right-item">
        //         <a href="#" className="" onClick={this.onLogout.bind(this)}>
        //             <img src={user.avatar} alt={user.username} title={user.username}
        //                 className="navbar-user-avatar"
        //                 style={{marginRight: '5px'}} />
        //                     Logout
        //         </a>
        //     </ul>
        // )

        const authLinks = (
            <ul className="navbar-right-item-wrapper">
                <button className="navbar-right-item" onClick={(e) => this.onLogout(e)}>
                    Logout
                </button>

                <img src={this.props.auth.user.avatar} alt={this.props.auth.user.username} title={this.props.auth.user.username}
                    className="navbar-user-avatar"/>

                 
             </ul>
            
        )

        const guestLinks = (
            <ul className="navbar-right-item-wrapper">
                <div className="navbar-label">
                    <Link className="navbar-right-item" to="/register">Sign Up</Link>
                </div>
                <div className="navbar-label">
                    <Link className="navbar-right-item" to="/login">Sign In</Link>
                </div>
            </ul>
        )

        return(
            <nav className="my-custom-navbar">
                <div className="navbar-logo" onClick={this.clovaria}>
                    <Link to="/">Shortify</Link>
                </div>
                <div className="navbar-right-item">
                    {this.props.auth.isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
      auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLoggedOut: decode => {
        dispatch(setLoggedOut(decode));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));