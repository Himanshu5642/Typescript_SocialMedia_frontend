import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Story from "../story/Story";
import "./Feed.css";
import { getAllPosts } from "../../api/postApiService";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let posts = async () => {
      const res = await getAllPosts();
      setPosts(res.data);
    }
    posts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Story />
        {posts.length === 0
          ? <div className="h2 m-5"><hr style={{ border: "1px solid black", width: "100%"}}/>No Posts</div>
          : posts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Feed;
