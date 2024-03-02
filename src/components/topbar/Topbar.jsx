import React, { useState } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { search_user } from "../../api/userApiService";
import SearchUser from "./SearchUser";

const Topbar = () => {
  const [searchUser, setsearchUser] = useState([]);

  const logOutHander = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const searchUserHandler = async (e) => {
    let res = await search_user({ keyword: e.target.value });
    // console.log("users", res.data);
    e.target.value.length > 0 ? setsearchUser(res.data) : setsearchUser([]);
  };

  const searchBoxVisibile = () => {
    const search_box = document.querySelector(".search_box");
    if (search_box)
      if (search_box.style.visibility === "hidden") setsearchUser([]);
  };

  return (
    <div className="topBarContainer">
      <div className="topBarLeft">
        <Link className="logo" to="/">
          Social Media
        </Link>
      </div>
      <div className="topBarCenter">
        <input
          type="text"
          className="p-3 search_input"
          placeholder="Search"
          onChange={searchUserHandler}
          onClick={searchBoxVisibile}
        />
        {searchUser.length > 0 && (
          <div className="search_box">
            {searchUser.map((user) => (
              <SearchUser key={user._id} user={user} />
            ))}
          </div>
        )}
      </div>
      <div className="topBarRight">
        <div className="topBarIcon">
          <FontAwesomeIcon icon={faBell} className="bell_icon" />
          <span className="iconBadge"></span>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} className="profile_icon" />
          </Link>
        </div>
        <Link to="/login">
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="logout_icon"
            onClick={logOutHander}
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
