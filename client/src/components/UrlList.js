import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import UrlItem from './UrlItem';
import { setPrivateUrls } from '../actions/getData';

import './css/UrlList.css'

function UrlList(props) {
    function renderList(urlList) {
        return urlList.map(each => {
            return (
                <UrlItem url={each} key={each._id} handleDeleteItem={handleDeleteItem}/>
            )
        })
    }

    async function handleDeleteItem(deletedUrlId){
        await axios.delete('/api/services/delete/url', {data: {url_id: deletedUrlId}})
            .then(res => {
                if (res.status === 409) {
                    alert(res.data.error);
                    
                }
            })
            .catch(error => console.log(error));
        //UPDATE STATE OF URL LIST
        const newUrlList = props.urlList.filter(urlItem => {
            return urlItem._id !== deletedUrlId;
        });
        props.setPrivateUrls(newUrlList);

    }


    return (
        <div className="url-list-container">
            {renderList(props.urlList)}
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        setPrivateUrls: urls => {
            dispatch(setPrivateUrls(urls));
        }
    };
};

export default connect(null, mapDispatchToProps)(UrlList);
