import React, {useState, useEffect} from 'react';
import countClicksByHours from '../services/countClicksByHours';

import axios from 'axios';

import './css/UrlList.css'

export default function UrlItem(props) {
    const [totalClicks, setTotalClicks] = useState(props.url.totalClicks);
    const [last24HoursClick, setlast24HoursClick] = useState(countClicksByHours(props.url.requestTimeStamp, 24));
    const [customHours, setcustomHours] = useState(1);
    const [lastCustomHoursClicks, setlastCustomHoursClicks] = useState(countClicksByHours(props.url.requestTimeStamp, 1));


    function onUrlClick(){
        setTotalClicks(totalClicks + 1);
        setlastCustomHoursClicks(lastCustomHoursClicks + 1);
        setlast24HoursClick(last24HoursClick +1);
    }

    function handleDeleteItem(){
        props.handleDeleteItem(props.url._id);
    }

    function handelSetcustomHours(number){
        setcustomHours(number);
        setlastCustomHoursClicks(countClicksByHours(props.url.requestTimeStamp, number))
    }

    const { originUrl, shortedUrl } = props.url;
    return (
        <div className="url-item-container">
            <div className="urls-container">
                <div className="shorted-url">
                    <b>Shorted URL: </b>
                    <a className="shorted-url-anchor" target="_blank" rel="noopener noreferrer" href={shortedUrl} onClick={onUrlClick}>
                        {shortedUrl}
                    </a>
                </div>
                <div className="original-url">
                    <b>Original URL: </b>
                    <a className="original-url-anchor" target="_blank" rel="noopener noreferrer" href={originUrl} title={originUrl}>
                        {originUrl}
                    </a>
                </div>
            </div>
            <div className="click-counter-container">
                <div className="total-clicks-label">Views tracking</div>
                <div className="click-counter-wrapper">
                    <div className="click-counter-item">Total <span className="clicks">{totalClicks}</span></div>
                    <div className="click-counter-item">Last 24 hours <span className="clicks">{last24HoursClick}</span></div>
                    <div className="click-counter-item">
                        <div className="custom-hours-container">
                            Last<span/><input className="custom-hours-input" value={customHours} type="number" min="1" max="999" onChange={e => handelSetcustomHours(e.target.value)}/>hours</div> <span className="clicks">{lastCustomHoursClicks}</span>
                    </div>
                </div>
            </div>
            {props.canDelete ? <button className="delete-button" onClick={handleDeleteItem}>-</button> : null }
        </div>
    );
}