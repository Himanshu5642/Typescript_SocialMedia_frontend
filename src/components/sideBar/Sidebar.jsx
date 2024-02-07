import React from 'react'
import './Sidebar.css'
import { Users } from '../../dummydata'
import Chats from '../chats/Chats'


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sideWrap">
            <h2>Chats</h2>
            <hr className='hrLine'/>
            <ul className='sideFriends'>
              {Users.map((u)=>(
                <Chats key={u.id} user={u} /> 
              ))}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar