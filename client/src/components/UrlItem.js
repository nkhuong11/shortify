import React, {useState, useEffect} from 'react';
import countClicksByHours from '../services/countClicksByHours';

import axios from 'axios';

import './css/UrlList.css'

export default function UrlItem(props) {
    const [totalClicks, setTotalClicks] = useState(props.url.totalClicks);
    const [lasthourClicks, setlasthourClicks] = useState(countClicksByHours(props.url.requestTimeStamp, 1));
    const [last24hoursClick, setlast24hoursClick] = useState(countClicksByHours(props.url.requestTimeStamp, 24));


    function onUrlClick(){
        setTotalClicks(totalClicks + 1);
        setlasthourClicks(lasthourClicks + 1);
        setlast24hoursClick(last24hoursClick +1);
    }

    function handleDeleteItem(){
        props.handleDeleteItem(props.url._id);
    }

    const { originUrl, shortedUrl } = props.url;
    return (
        <div className="url-item-container">
            <div>
                <div className="shorted-url">
                    <b>Shorted URL: </b>
                    <a target="_blank" rel="noopener noreferrer" href={shortedUrl} onClick={onUrlClick}>
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
            <div className="click-counter-container">
               <div className="click-counter-item">Last hour <span className="clicks">{lasthourClicks}</span></div>
               <div className="click-counter-item">Last 24 hours <span className="clicks">{last24hoursClick}</span></div>
               <div className="click-counter-item">Total <span className="clicks">{totalClicks}</span></div>
               <button className="delete-button" onClick={handleDeleteItem}>DELETE</button>
            </div>
        </div>
    );
}