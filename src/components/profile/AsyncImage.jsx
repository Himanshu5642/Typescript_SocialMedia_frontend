import React, { useState, useEffect } from "react";
import "./Profile.css"
import { getFileUrl } from "../../config/firebase";

const AsyncImage = ({ post }) => {
  const [imageUrl, setImageUrl] = useState(null);
  console.log("post", post)
  useEffect(() => {
    const ac = new AbortController();
    const getImageUrl = async () => {
      const url = await getFileUrl("images", post.images[0]);
      setImageUrl(url);
    };
    getImageUrl();
    return () => ac.abort();
  }, [post]);

  return imageUrl ? (
    <img src={imageUrl} alt="" className="post_area_img" />
  ) : null;
};

export {AsyncImage};
