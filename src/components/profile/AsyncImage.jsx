import React, { useState, useEffect } from "react";
import "./Profile.css"
import { getFileUrl } from "../../config/firebase";

const AsyncImage = ({ post }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getImageUrl = async () => {
      const url = await getFileUrl("images", post.images[0]);
      setImageUrl(url);
    };
    getImageUrl();
  }, [post]);

  return imageUrl ? (
    <img src={imageUrl} alt="" className="post_area_img" />
  ) : null;
};

export default AsyncImage;
