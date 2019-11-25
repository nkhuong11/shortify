import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import GenerateURLComponent from '../components/GenerateURLComponent';
import Tabs from '../components/Tabs';
import UrlList from '../components/UrlList';

import './css/HomePage.css'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recentUrls: [],
            privateUrls: []
        }
    
    }
    
    async componentDidMount() {
        console.log('isAuthen', this.props.auth.isAuthenticated);
        const fetchedUrls = await axios.get('/api/services/get/urls')
        .then(res => {
            if(res.status === 200) {
                return res.data
            }
        })
        .catch(err => {
            console.log(err);
        })

        
        if(fetchedUrls) {
            this.setState({
                recentUrls: fetchedUrls.recentUrls,
                privateUrls: fetchedUrls.privateUrls
            });
        }
    }
    

    render() {
        return (
            <div className="homepage-container">
               <GenerateURLComponent/>
               <div>
                <Tabs>
                    <div label="Recent URL" isHidden={false}>
                      <UrlList urlList={this.state.recentUrls} />
                    </div>
                    <div label="Your URL" isHidden={!this.props.auth.isAuthenticated}>
                        <UrlList urlList={this.state.privateUrls}/>
                    </div>
                </Tabs>
               </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      auth: state.auth
    };
};

export default connect(mapStateToProps)(HomePage);