import React, { useState } from 'react';

import './css/UrlList.css'

export default function UrlItem(props) {
    const {originUrl, shortedUrl} = props.url
    return (
        <div className="url-item-container">
            <div>
                <div className="shorted-url">
                    <b>Shorted URL: </b>
                    <a target="_blank" rel="noopener noreferrer" href={shortedUrl}>
                        {shortedUrl}
                    </a>
                </div>
                <div className="original-url">
                    <b>Original URL: </b>
                    <a target="_blank" rel="noopener noreferrer" href={originUrl}>
                        {originUrl}
                    </a>
                </div>
            </div>
            <div>
                <div>Counter</div>
            </div>
        </div>
    );
}