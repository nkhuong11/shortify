import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import ModalWrapper from './ModalWrapper';

import setAuthToken from '../services/setAuthToken';
import {setLoggedOut} from '../actions/authentication';

import './css/Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenuModal: false
        }
        this.renderMunuModal = this.renderMunuModal.bind(this);
    }

    onLogout(e) {
        e.preventDefault();
        this.setState({showMenuModal: false})
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

    renderMunuModal() {
        return (
             <ModalWrapper onCloseRequest={() => this.setState({showMenuModal:false})}>
                 <div className="modal-menu">
                    <div className="modal-menu-item disable">
                        Other Functions(Not Yet)
                    </div>
                    <div className="modal-menu-item" onClick={(e) => this.onLogout(e)}>
                        Logout
                    </div>
                 </div>
                
            </ModalWrapper>
        );
    }


    render() {
        const authLinks = (
            <ul className="navbar-right-item-wrapper">
                <div onClick={() => {this.setState({showMenuModal: true})}} >
                    <img className="navbar-user-avatar"
                        src={this.props.auth.user.avatar} 
                        alt={this.props.auth.user.username} 
                        title={this.props.auth.user.username}/>
                </div>
                {this.state.showMenuModal ? this.renderMunuModal() : null}
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
                <div className="navbar-logo">
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