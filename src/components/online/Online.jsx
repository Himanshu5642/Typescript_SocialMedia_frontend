import React, { useState } from "react";
import "./Online.css";
import { getFileUrl } from "../../config/firebase";

const Online = ({ user }) => {
  const [profilePicImageUrl, setProfilePicImageUrl] = useState(null);

  (async function () {
    await getFileUrl("profile", user.profile_pic).then((res) =>
      setProfilePicImageUrl(res)
    );
  })();

  return (
    <div>
      <li className="FriendList">
        <div className="individualFriend">
          <img src={profilePicImageUrl} alt="" />
          <span className="onlineshow"></span>
        </div>
        <span className="username">{user.username}</span>
      </li>
    </div>
  );
};

export default Online;
