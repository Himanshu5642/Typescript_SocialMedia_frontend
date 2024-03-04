import React, { useState } from "react";
import "./Post.css";
import {
  likeUnlikePost,
  deletePost,
  // convertFileToUrl,
} from "../../api/postApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useQueryClient, useMutation } from "@tanstack/react-query";
// import { FcLike } from "react-icons/fc";
import { getFileUrl } from "../../config/firebase";

const Post = (props) => {
  const queryClient = useQueryClient();
  const { post, getCommentPostId, setShowCommentModel } = props;
  const contentCreatedAt = moment(post.createdAt);
  const monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const contentMonth = monthsArr[contentCreatedAt.month()];
  const [showListOfOpt, setShowListOfOpt] = useState(false);
  const [postImageUrl, setPostImageUrl] = useState(null);
  const [profilePicImageUrl, setProfilePicImageUrl] = useState(null);

  (async function () {
    await getFileUrl("images", post.images[0]).then((res) =>
      setPostImageUrl(res)
    );
    await getFileUrl("profile", post.user.profile_pic).then((res) =>
      setProfilePicImageUrl(res)
    );
  })();

  const likeUnlikeMutation = useMutation({
    mutationFn: likeUnlikePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const likeHandler = (type, postId) => {
    likeUnlikeMutation.mutate({ type, postId });
  };

  const toggleCommentModel = () => {
    getCommentPostId(post._id);
    setShowCommentModel(true);
  };

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const deletePostHandler = async () => {
    deletePostMutation.mutate(post._id);
  };

  return (
    <div className="post">
      <div className="postWrap">
        <div className="posttop">
          <img src={profilePicImageUrl} alt="" />
          <span className="name_span">
            {post.user.username.trim().at(0).toUpperCase() +
              post.user.username.slice(1)}
          </span>
          <span className="post_date">{`${contentCreatedAt.date()} ${contentMonth}`}</span>
          {showListOfOpt && (
            <div className="post_list_box">
              <FontAwesomeIcon
                icon={faPenToSquare}
                id="post_list_update_icon"
              />
              |
              <FontAwesomeIcon
                icon={faTrashCan}
                id="post_list_delete_icon"
                onClick={deletePostHandler}
              />
              <FontAwesomeIcon
                icon={faXmark}
                id="post_list_cross_icon"
                onClick={() => setShowListOfOpt(!showListOfOpt)}
              />
            </div>
          )}
          {!showListOfOpt && (
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              id="post_dots_icon"
              onClick={() => setShowListOfOpt(!showListOfOpt)}
            />
          )}
        </div>
        <div className="postcenter">
          <img src={postImageUrl} alt="" />
          <div>{post.caption.slice(0, 40)}</div>
        </div>
        <div className="postbottom">
          <div className="postbottomleft">
            <FontAwesomeIcon
              icon={faHeart}
              className="like_icon"
              onClick={() => likeHandler(post.content_type, post._id)}
            />
            {/* <FcLike
              className="like_icon_colored"
              onClick={() => likeHandler(post.content_type, post._id)}
            /> */}
            <span>{post.like_count} likes</span>
          </div>
          <div className="postbottomright">
            <FontAwesomeIcon
              icon={faCommentDots}
              className="comment_icon"
              onClick={toggleCommentModel}
            />
            <span onClick={toggleCommentModel}>
              {post.comments_count} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
