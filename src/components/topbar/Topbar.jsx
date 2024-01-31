import React from 'react'
import './Topbar.css'
import {Link} from "react-router-dom";

const Topbar = () => {
    return (
        <div className='topBarContainer'>
            <div className="topBarLeft">
                <Link className='logo' to="/">
                Social Media
                </Link>
            </div>
            <div className="topBarCenter">
                <input type="text" />
            </div>
            <div className="topBarRight">
                <div className="topBarIcon">
                    <p className='iconLink'>🧛‍♂️</p>
                    <p className='iconLink'>📨</p>
                    <p className='iconLink'>🔔</p>
                    <span className='iconBadge'>1</span>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Emblem-person-blue.svg/1200px- Emblem-person-blue.svg.png" alt="" className='topBarImage' />
            </div>
        </div>
    )
}

export default Topbar