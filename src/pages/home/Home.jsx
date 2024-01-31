import React from 'react'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/right/Rightbar'
import Sidebar from '../../components/sideBar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './Home.css'


const Home = () => {
    return (
        <>
       <Topbar />
       <div className="homecontainer">
            <Sidebar />
            <Feed />
            <Rightbar />
       </div>
        </>
    )
}

export default Home