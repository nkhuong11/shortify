import React, { useState, useRef } from 'react';
import axios from 'axios';

import "./css/GenerateURLComponent.css";

export default function GenerateURLComponent(props) {
    const [originUrl, setOriginUrl] = useState("");
    const [uniqId, setUniqId] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [shortedUrl, setShortedUrl] = useState("");
    const [isCopy, setCopy] = useState(false)
    const urlResultRef = useRef(null);

    
    function handleSubmit(e) {
        e.preventDefault();
        

        axios({
            method: 'post',
            url: '/api/services/shortener',
            data: {
                originUrl: originUrl,
                uniqId: uniqId
            }})
            .then(res => {
                if (res.status === 409) {
                    console.log(res.data)
                    
                } else if (res.status === 200) {
                    console.log(res.data)
                    setShortedUrl(res.data.url);
                    setShowResult(true);
                }
                
               
            })
            .catch(error => console.log(error));

    }

    function copyToClipboard(e) {
        urlResultRef.current.select()
        document.execCommand('copy');
       
        e.target.focus();
        setCopy(true);
    };

    const renderResult = (
        <div className="horizontal-container url-result-container">
            <textarea className="shortened-url" ref={urlResultRef} value={shortedUrl} readOnly/>
            <button className="copy-url-button" onClick={copyToClipboard}>Copy URL</button>
        </div>
    );

    return (
        <div className="vertical-container">
            <form className="horizontal-container" onSubmit={handleSubmit}>
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

                <div className="generate-buton-container">
                    <button className="generate-buton" type="submit">
                        Generate URL
                    </button>
                </div>
            </form>

            {showResult ? renderResult : null}
            
        </div>
    );
}