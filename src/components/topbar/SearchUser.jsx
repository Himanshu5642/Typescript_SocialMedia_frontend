import React, { useState } from "react";
import "./Topbar.css";
import { useNavigate } from "react-router-dom";
import { getFileUrl } from "../../config/firebase";

function SearchUser({ user }) {
  const navigate = useNavigate();
  const [profilePicImageUrl, setProfilePicImageUrl] = useState(null);

  const userProfileHandler = () => {
    navigate("/userProfile", { state: { userId: user._id } });
  };

  (async function () {
    await getFileUrl("profile", user.profile_pic).then((res) =>
      setProfilePicImageUrl(res)
    );
  })();

  return (
    <div className="search_div" onClick={userProfileHandler}>
      <img
        src={profilePicImageUrl}
        alt="profile"
        className="search_profile_img"
      />
      <span>
        {user?.username.trim().at(0).toUpperCase() + user?.username.slice(1)}
      </span>
    </div>
  );
}

export default SearchUser;
