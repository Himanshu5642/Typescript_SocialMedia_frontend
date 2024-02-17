import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Story from "../story/Story";
import "./Feed.css";
import {
  getAllPosts,
  getAllComments,
  addComment,
} from "../../api/postApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Comment from "../comment/Comment";
import { BeatLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "50px auto",
  borderColor: "red",
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [commentPostId, setCommentPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    let posts = async () => {
      const res = await getAllPosts();
      setPosts(res.data);
      setPostsLoading(true);
    };
    posts();

    let getComments = async () => {
      const res = await getAllComments({ postId: commentPostId });
      setComments(res.data);
    };
    getComments();
    return () => ac.abort();
  }, [commentPostId]);

  const getCommentPostId = (id) => setCommentPostId(id);

  const closeCommentBoxHandler = () => {
    let commentSectionElement = document.querySelector(".comment_section");
    commentSectionElement.classList.add("close_comment_section");
  };

  const newPostComment = async () => {
    console.log("new comment");
    await addComment({
      content_type: "post",
      content,
      content_id: commentPostId,
    });
    setContent("");
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Story />
        {posts.length === 0 ? (
          postsLoading ? (
            <div className="h2 m-5">
              <hr style={{ border: "1px solid black", width: "100%" }} />
              No Posts
            </div>
          ) : (
            <BeatLoader
              color="#36d7b7"
              loading={!postsLoading}
              cssOverride={override}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
              
            />
          )
        ) : (
          posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              getCommentPostId={getCommentPostId}
            />
          ))
        )}
      </div>

      <div className="comment_section close_comment_section">
        <h4 className="comment_heading">
          Comment Box{" "}
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="close_comment"
            onClick={closeCommentBoxHandler}
          />
        </h4>
        {comments.length === 0 ? (
          <h4 className="comment_text">No Comments</h4>
        ) : (
          comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        )}
        <div className="comment_input_div">
          <input
            type="text"
            name="content"
            className="comment_input"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="comment_send"
            onClick={newPostComment}
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;
