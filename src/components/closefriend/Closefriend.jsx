import React from 'react'

const Closefriend = ({user}) => {
  return (
    <div>
        <li className="listFriends">
                <img src={ user.profilePicture } alt="" className="friendimg" />
                <span>{ user.username }</span>
              </li>
    </div>
  )
}

export default Closefriend