import React from "react";
import "./Profile.css";
import Topbar from "../topbar/Topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { userProfile } from "../../api/userApiService";
import { userPosts } from "../../api/postApiService";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function UserProfile() {
  const location = useLocation();

  const { data: userData } = useQuery({
    queryKey: ["user", location.state.userId],
    queryFn: async () => await userProfile({ userId: location.state.userId }),
  });

  const { data: userPostsData } = useQuery({
    queryKey: ["myPost", location.state.userId],
    queryFn: async () =>
      await userPosts({
        userId: location.state.userId,
        type: "post",
      }),
  });

  return (
    <>
      <Topbar />
      <div className="profile_box">
        <div className="profile_image_section">
          <div className="profile_img_box">
            <img
              src={`uploads/${userData?.data[0].profile_pic}`}
              alt="profile"
              className="profile_img"
            />
          </div>
          <div className="followers_box">
            <span>
              {userPostsData?.data.length} <br /> posts
            </span>
            <span>
              {userData?.data[0].followers_count || 0} <br /> followers
            </span>
            <span>
              {userData?.data[0].following_count || 0} <br /> following
            </span>
          </div>
        </div>
        <div className="profile_content_box">
          <h2>
            {userData
              ? userData?.data[0].username.trim().at(0).toUpperCase() +
                userData?.data[0].username.slice(1)
              : userData?.data[0].username}
          </h2>
          <p></p>
        </div>
        <FontAwesomeIcon icon={faLayerGroup} className="profile_post_icon" />
        <div className="posts_section">
          {userPostsData?.data.map((post) => (
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
