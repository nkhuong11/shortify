import React, { Component } from 'react';
import axios from 'axios';

import GenerateURLComponent from '../components/GenerateURLComponent';
import Tabs from '../components/Tabs';
import UrlList from '../components/UrlList';

import './css/HomePage.css'

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urls: []
        }
    
    }
    
    // componentWillMount() {
    //     if(!this.props.auth.isAuthenticated) {
    //         this.props.history.push('/login');
    //     }
    // }

    componentDidMount() {
        axios.get('/api/services/get/urls')
        .then(res => {
            if(res.status === 200) {
                console.log(res.data.urls)
                this.setState({urls: res.data.urls})
            }
        })
    }
    

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
               <div>
                <Tabs>
                    <div label="Recent URL">
                      <UrlList urlList={this.state.urls}/>
                    </div>
                    <div label="Your URL">
                        After 'while, <em>Crocodile</em>!
                    </div>
                </Tabs>
               </div>
            </div>
        );
    }
}