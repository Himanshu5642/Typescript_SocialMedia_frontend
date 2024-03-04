import React, { useState } from "react";
import "./Profile.css";
import Topbar from "../topbar/Topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { myProfile } from "../../api/userApiService";
import { myPosts } from "../../api/postApiService";
import { useQuery } from "@tanstack/react-query";
import { getFileUrl } from "../../config/firebase";
import AsyncImage from "./AsyncImage";

function Profile() {
  const [profilePicImageUrl, setProfilePicImageUrl] = useState(null);

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await myProfile(),
  });

  const { data: myPostsData } = useQuery({
    queryKey: ["myPost"],
    queryFn: async () => await myPosts({ type: "post" }),
  });

  (async function () {
    await getFileUrl("profile", userData?.data.profile_pic).then((res) =>
      setProfilePicImageUrl(res)
    );
  })();

  return (
    <>
      <Topbar />
      <div className="profile_box">
        <div className="profile_image_section">
          <div className="profile_img_box">
            <img
              src={profilePicImageUrl}
              alt="profile"
              className="profile_img"
            />
          </div>
          <div className="followers_box">
            <span>
              {myPostsData?.data.length} <br /> posts
            </span>
            <span>
              {userData?.data.followers_count || 0} <br /> followers
            </span>
            <span>
              {userData?.data.following_count || 0} <br /> following
            </span>
          </div>
        </div>
        <div className="profile_content_box">
          <h2>
            {userData
              ? userData?.data.username.trim().at(0).toUpperCase() +
                userData?.data.username.slice(1)
              : userData?.data.username}
          </h2>
          <p></p>
        </div>
        <FontAwesomeIcon icon={faLayerGroup} className="profile_post_icon" />
        <div className="posts_section">
          {myPostsData?.data.map((post) => (
            <AsyncImage key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
