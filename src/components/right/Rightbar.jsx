import React from 'react'
import Online from '../online/Online'
import './Rightbar.css'
import { Users } from '../../dummydata'

const Rightbar = () => {
  return (
    <div className='rightbar'>
      <div className="rightbarWrap">
        <h4 className='onlineheading'>Online Friends</h4>
        <ul className="onlineFriendList">
          { Users.map((u) =>(
            <Online key={u.id} user={u} />
          )) }
        </ul>
      </div>
    </div>
  )
}

export default Rightbar