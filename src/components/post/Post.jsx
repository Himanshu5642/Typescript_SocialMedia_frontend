import React, { useState, useEffect, useRef } from "react";
import "./Post.css";
import { likeUnlikePost } from "../../api/postApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCommentDots,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Comment from "../comment/Comment";
import { contentDateSwitchCase } from "../../helpers/dateSwitchCase.helpers";
import { getAllComments } from "../../api/postApiService";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.like_count);
  const toggle = useRef(false);
  const [commentPostId, setCommentPostId] = useState(null);
  const [comments, setComments] = useState([]);

  const likeHandler = (type, postId) => {
    const likeUnlike = async () => {
      const liked = await likeUnlikePost({ type, postId });
      setLike(liked.data.msg === "liked" ? like + 1 : like - 1);
    };
    likeUnlike();
  };

  const toggleCommentModel = () => {
    toggle.current = !toggle.current;
    setCommentPostId(post._id);
    toggle.current === true ? setCommentPostId(post._id) : setCommentPostId(null);
  };

  useEffect(() => {
    // console.log("commentPostId", commentPostId);
    let getComments = async () => {
      const res = await getAllComments({ postId: commentPostId });
      // console.log("comments", res.data);
      setComments(res.data);
    };
    getComments();
  }, [commentPostId]);

  const closeCommentBoxHandler = () => {
    let commentSectionElement = document.querySelector(".comment_section");
    console.log("commentSectionElement", commentSectionElement);
    commentSectionElement.classList.add("close_comment_section");
  };

  return (
    <div className="post">
      <div className="postWrap">
        <div className="posttop">
          <img src={"/uploads/" + post.user.profile_pic} alt="" />
          <span className="name_span">
            {post.user.username.trim().at(0).toUpperCase() +
              post.user.username.slice(1)}
          </span>
          <span className="post_date">{contentDateSwitchCase(post)}</span>
        </div>
        <div className="postcenter">
          <img src={"/uploads/" + post.images[0]} alt="" />
          <div>{post.caption.slice(0, 40)}</div>
        </div>
        <div className="postbottom">
          <div className="postbottomleft">
            <FontAwesomeIcon
              icon={faHeart}
              className="like_icon"
              onClick={() => likeHandler(post.content_type, post._id)}
            />
            <span>{like} likes</span>
          </div>
          <div className="postbottomright">
            <FontAwesomeIcon
              icon={faCommentDots}
              className="comment_icon"
              onClick={toggleCommentModel}
            />
            <span>{post.comments_count} comments</span>
          </div>
        </div>
      </div>

      {comments.map((comment) => (
        <div key={comment._id} id={comment._id} className="comment_section">
          <h4 className="comment_heading">
            Comment Box{" "}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close_comment"
              onClick={closeCommentBoxHandler}
            />
          </h4>
          <Comment comment={comment} />
          <div className="comment_input_div">
            <input type="text" name="" className="comment_input" />
            <FontAwesomeIcon icon={faPaperPlane} className="comment_send" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
