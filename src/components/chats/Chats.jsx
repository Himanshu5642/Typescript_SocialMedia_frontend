import React from "react";
import "./Chats.css";

const Chats = ({ user }) => {
  return (
    <div>
      <li className="listFriends">
        <img src={user.profilePicture} alt="" className="friendimg" />
        <span>{user.username}</span>
      </li>
      <hr />
    </div>
  );
};

export default Chats;
