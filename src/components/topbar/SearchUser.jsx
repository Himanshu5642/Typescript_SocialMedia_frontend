import React from "react";
import "./Topbar.css";
import { useNavigate } from "react-router-dom";

function SearchUser({ user }) {
  const navigate = useNavigate();

  const userProfileHandler = () => {
    navigate("/userProfile", { state: { userId: user._id } });
  };

  return (
    <div className="search_div" onClick={userProfileHandler}>
      <img
        src={`uploads/${user?.profile_pic}`}
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
