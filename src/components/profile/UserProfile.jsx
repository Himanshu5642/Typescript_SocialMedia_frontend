import React, { useEffect, useState } from "react";
import "./Profile.css";
import Topbar from "../topbar/Topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { userProfile } from "../../api/userApiService";
import { userPosts } from "../../api/postApiService";
import { useLocation } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState({
    username: "",
  });
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getUserProfile = async () => {
      let response = await userProfile({ userId: location.state.userId });
      setUser(response.data[0]);
    };
    getUserProfile();

    const getUserPosts = async () => {
      let response = await userPosts({
        userId: location.state.userId,
        type: "post",
      });
      setPosts(response.data);
    };
    getUserPosts();
  }, [location.state.userId]);

  return (
    <>
      <Topbar />
      <div className="profile_box">
        <div className="profile_image_section">
          <div className="profile_img_box">
            <img
              src={`uploads/${user?.profile_pic}`}
              alt="profile"
              className="profile_img"
            />
          </div>
          <div className="followers_box">
            <span>
              {posts.length} <br /> posts
            </span>
            <span>
              {user?.followers_count || 0} <br /> followers
            </span>
            <span>
              {user?.following_count || 0} <br /> following
            </span>
          </div>
        </div>
        <div className="profile_content_box">
          <h2>
            {user?.username.length > 1
              ? user?.username.trim().at(0).toUpperCase() +
                user.username.slice(1)
              : user?.username}
          </h2>
          <p></p>
        </div>
        <FontAwesomeIcon icon={faLayerGroup} className="profile_post_icon" />
        <div className="posts_section">
          {posts.map((post) => (
            <img
              key={post._id}
              src={`uploads/${post.images[0]}`}
              alt=""
              className="post_area_img"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
