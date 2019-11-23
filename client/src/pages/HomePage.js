import React, { Component } from 'react';
import axios from 'axios';

import GenerateURLComponent from '../components/GenerateURLComponent';
import './css/HomePage.css'

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    
    }
    
    // componentWillMount() {
    //     if(!this.props.auth.isAuthenticated) {
    //         this.props.history.push('/login');
    //     }
    // }

    // componentDidMount() {
    //     axios.get(`/api/get/posts/${this.props.auth.user._id}`)
    //     .then(res => {
    //         console.log(res.data);
    //         // const friend_post = res.data.posts;
    //         this.setState({
    //             posts: res.data.posts
    //         });
    //     })
    // }
    

    // onProfileClick() {
    //     this.props.history.push(`/profile/${this.props.auth.user.username}`);
    // }

    // updatePost(post){
    //     this.setState(prevState => ({
    //         posts: [post, ...prevState.posts]
    //     }))
    // }

    // renderPost() {
    //     return this.state.posts.map((post, index) => {
    //         return (
    //             <Post key={index} owner={post.owner} image_url={post.image_url} content={post.content} loved_by={post.loved_by} shared_by={post.shared_by}/>
    //         );
    //     })
    // }

    render() {

        return (
            <div className="homepage-container">
               <GenerateURLComponent/>
            </div>
        );
    }
}