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


    function checkValidUrl(url) {
        return url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    }

    //Only Accept ASCII characters
    function checkValidCustomId(id) {
        return id.match(/^[\x00-\xFF]*$/);
    }
    
    function handleSubmit(e) {
        e.preventDefault();

        if(checkValidUrl(originUrl) && checkValidCustomId(uniqId)) {
            axios.post('/api/services/shortener', { originUrl: originUrl,uniqId: uniqId})
                .then(res => {
                    if (res.status === 409) {
                        alert(res.data.error)
                        
                    } else if (res.status === 200) {
                        setShortedUrl(res.data.shortedUrl);
                        setShowResult(true);
                        alert("Created URL successfully");
                        // UPDATE UI STATE (ITEM LIST);
                        if(props.auth.isAuthenticated) {
                            props.setPrivateUrls([...props.urlItems.privateUrls, res.data])
                        } else {
                            props.setPublicUrls([...props.urlItems.publicUrls, res.data])
                        }
                    }
                })
                .catch(error => console.log(error));
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
