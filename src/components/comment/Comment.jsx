import React, { useState } from "react";
import "./Comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { likeUnlikeComment } from "../../api/postApiService";
import moment from "moment";
import { getFileUrl } from "../../config/firebase";


function Comment({ comment }) {
  const [like, setLike] = useState(comment.like_count);
  // console.log(comment);
  const contentCreatedAt = moment(comment.createdAt);
  const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', "Jun", 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const contentMonth = monthsArr[contentCreatedAt.month()];
  const [profilePicImageUrl, setProfilePicImageUrl] = useState(null);

  const likeHandler = (commentId) => {
    const likeUnlike = async () => {
      const liked = await likeUnlikeComment({ commentId });
      // console.log(liked.data);
      setLike(liked.data.msg === "liked" ? like + 1 : like - 1);
      // console.log("like",like)
    };
    likeUnlike();
  };

  (async function () {
    await getFileUrl("profile", comment.user_id.profile_pic).then((res) =>
      setProfilePicImageUrl(res)
    );
  })();

  return (
    <div>
      <div className="comment_box">
        <img
          src={profilePicImageUrl}
          alt="profile"
          className="comment_profile_img"
        />
        <span className="comment_user_name mx-2">
          {comment.user_id.username.trim().at(0).toUpperCase() +
            comment.user_id.username.slice(1)}
        </span>
        <span className="comment_date">{`${contentCreatedAt.date()} ${contentMonth}`}</span>
        <span className="like_comment">
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => likeHandler(comment._id)}
          />{" "}
          {like}
        </span>
        <div className="user_comment">{comment.content}</div>
      </div>
    </div>
  );
}

export default Comment;
