import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import GenerateURLComponent from '../components/GenerateURLComponent';
import Tabs from '../components/Tabs';
import UrlList from '../components/UrlList';

import { setPrivateUrls, setPublicUrls } from '../actions/getData';

import './css/HomePage.css'

class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    

    async componentDidMount() {
        const recentUrlsRespone = await axios.get('/api/services/get/public-urls');
        console.log(recentUrlsRespone);
        if (recentUrlsRespone.status === 200) {
            this.props.setPublicUrls(recentUrlsRespone.data);
        }
        if (this.props.auth.isAuthenticated) {
            const privateUrlsRespone = await axios.get('/api/services/get/private-urls');
            if (privateUrlsRespone.status === 200) {
                this.props.setPrivateUrls(privateUrlsRespone.data);
            }
        }
    }
    

    render() {
        return (
            <div className="homepage-container">
               <GenerateURLComponent/>
               <div className="tab-wrapper">
                    <Tabs>
                        <div label="Recent URL" isHidden={false}>
                            <UrlList urlList={this.props.urlItems.publicUrls}/>
                        </div>
                        <div label="Your URL" isHidden={!this.props.auth.isAuthenticated}>
                            <UrlList urlList={this.props.urlItems.privateUrls}/>
                        </div>
                    </Tabs>
               </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      auth: state.auth,
      urlItems: state.urlItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setPrivateUrls: urls => {
            dispatch(setPrivateUrls(urls));
        },
        setPublicUrls: urls => {
            dispatch(setPublicUrls(urls));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);