import React, { useState } from 'react';

import UrlItem from './UrlItem';

import './css/UrlList.css'

export default function UrlList(props) {
    function renderList(urlList) {
        return urlList.map(each => {
            return (
                <UrlItem url={each} key={each._id}/>
            )
        })
    }


    return (
        <div className="url-list-container">
            {renderList(props.urlList)}
        </div>
    )
    
}
