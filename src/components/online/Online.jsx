import React from "react";
import "./Online.css";

const Online = ({ user }) => {
  return (
    <div>
      <li className="FriendList">
        <div className="individualFriend">
          <img src={"uploads/" + user.profile_pic} alt="" />
          <span className="onlineshow"></span>
        </div>
        <span className="username">{user.username}</span>
      </li>
    </div>
  );
};

export default Online;
