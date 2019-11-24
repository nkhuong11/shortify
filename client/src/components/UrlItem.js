import React, { useState } from 'react';

import './css/UrlList.css'

export default function UrlItem(props) {
    const {originUrl, shortedUrl} = props.url
    return (
        <div className="url-item-container">
            <a target="_blank" rel="noopener noreferrer" href={shortedUrl}>
                {shortedUrl}
            </a>
            <div>
                {originUrl}
            </div>
        </div>
    );
}