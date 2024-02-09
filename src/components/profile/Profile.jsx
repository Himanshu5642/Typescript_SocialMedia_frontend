import React, { useEffect, useState } from "react";
import "./Profile.css";
import Topbar from "../topbar/Topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { myProfile } from "../../api/userApiService";
import { myPosts } from "../../api/postApiService";

function Profile() {
  const [user, setUser] = useState({
    username: "",
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getMyProfile = async () => {
      let response = await myProfile();
      setUser(response.data);
    };
    getMyProfile();

    const getMyPosts = async () => {
      let response = await myPosts({ type: "post" });
      setPosts(response.data);
    };
    getMyPosts();
  }, []);
  // console.log(user);
  // console.log(posts);

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

export default Profile;
