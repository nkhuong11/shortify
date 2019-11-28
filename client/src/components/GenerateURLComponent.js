import React, { useState, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { setPrivateUrls, setPublicUrls } from '../actions/getData';


import "./css/GenerateURLComponent.css";

function GenerateURLComponent(props) {
    const [originUrl, setOriginUrl] = useState("");
    const [uniqId, setUniqId] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [shortedUrl, setShortedUrl] = useState("");
    const urlResultRef = useRef(null);

    //Only Accept ASCII characters
    function checkValidCustomId(id) {
        return id.match(/^[\x00-\xFF]*$/);
    }

    function configInputUrl(url) {
        if (url.match(/(http(s)?:\/\/)(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
            return url; //Link already filled with http(s) and www.
        } else if (url.match(/(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
            return "http://" + url;
        } else if(url.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
            return "http://www." + url;
        } else {
            return false
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        const checkedOriginUrl = configInputUrl(originUrl);
    
        if(checkedOriginUrl && checkValidCustomId(uniqId)) {
            axios.post('/api/services/shortener', { originUrl: checkedOriginUrl,uniqId: uniqId})
                .then(res => {
                    if (res.status === 409) {
                        alert("Custome Id conflict. Please choose another one.")
                    } else if (res.status === 200) {
                        setShortedUrl(res.data.shortedUrl);
                        setShowResult(true);
                        alert("Created URL successfully");
                        // UPDATE UI STATE (ITEM LIST);
                        if(props.auth.isAuthenticated) {
                            props.setPrivateUrls([res.data, ...props.urlItems.privateUrls])
                        } else {
                            props.setPublicUrls([res.data, ...props.urlItems.publicUrls])
                        }
                    }
                })
                .catch(error => alert(error.response.data));
        } else {
            alert('Invalid URL/Custom ID. Please try again');
        }


    }

    function copyToClipboard(e) {
        urlResultRef.current.select()
        document.execCommand('copy');
       
        e.target.focus();
    };

    const renderResult = (
        <div className="url-result-container">
            <textarea className="shortened-url" ref={urlResultRef} value={shortedUrl} readOnly/>
            <button className="copy-url-button" onClick={copyToClipboard}>Copy URL</button>
        </div>
    );

    return (
        <div className="vertical-container">
            <form className="horizontal-container generate-url-component" onSubmit={handleSubmit}>
                <div className="url-input-container">    
                    <input
                        className="url-input"
                        type="text"
                        placeholder="Origin URL"
                        autoFocus
                        name="originUrl"
                        onChange={ e => setOriginUrl(e.target.value)}
                        value={originUrl}/>
                    <input
                        className="uniqid-input"
                        type="text"
                        placeholder="Custome ID"
                        name="uniqId"
                        onChange={ e => setUniqId(e.target.value)}
                        value={uniqId}/>
                </div>

                <button className="generate-buton" type="submit">
                    Generate URL
                </button>
            </form>

            {showResult ? renderResult : null}
            
        </div>
    );
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateURLComponent);
