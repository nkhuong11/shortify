import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import GenerateURLComponent from '../components/GenerateURLComponent';
import Tabs from '../components/Tabs';
import UrlList from '../components/UrlList';

import countClicksByHours from '../services/countClicksByHours';

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
        const recentUrls = await axios.get('/api/services/get/public-urls')
        .then(res => {
            if(res.status === 200) {
                console.log(res.data);
                return res.data
            }
        })
        .catch(err => {
            console.log(err);
        })

        if(recentUrls) {
            this.setState({ recentUrls: recentUrls });
        }

        if (this.props.auth.isAuthenticated) {
            const privateUrls = await axios.get('/api/services/get/private-urls')
            .then(res => {
                if(res.status === 200) {
                    return res.data
                }
            })
            .catch(err => {
                console.log(err);
            })
            if(privateUrls) {
                this.setState({ privateUrls: privateUrls });
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