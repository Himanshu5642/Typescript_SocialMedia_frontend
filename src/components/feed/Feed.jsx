import React, { useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const override = {
  display: "block",
  margin: "50px auto",
  borderColor: "red",
};

const Feed = () => {
  const queryClient = useQueryClient();
  const [commentPostId, setCommentPostId] = useState(null);
  const [content, setContent] = useState("");
  const [showCommentModel, setShowCommentModel] = useState(false);

  const getCommentPostId = (id) => setCommentPostId(id);

  const { data: postsData, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getAllPosts(),
  });

  const { data: commentsData } = useQuery({
    queryKey: ["comments", commentPostId],
    queryFn: async () => await getAllComments({ postId: commentPostId }),
  });
  // console.log("commentsData", commentsData);

  const closeCommentBoxHandler = () => setShowCommentModel(false);

  const newCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
  });

  const newPostComment = async () => {
    console.log("new comment");
    newCommentMutation.mutate({
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

        {isLoading ? (
          <BeatLoader
            color="#36d7b7"
            loading={isLoading}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : postsData?.data.length !== 0 ? (
          postsData?.data.map((post) => (
            <Post
              key={post._id}
              post={post}
              getCommentPostId={getCommentPostId}
              setShowCommentModel={setShowCommentModel}
            />
          ))
        ) : (
          <div className="h2 m-5">
            <hr style={{ border: "1px solid black", width: "100%" }} />
            No Posts
          </div>
        )}
      </div>

      {showCommentModel && (
        <div className="comment_section">
          <h4 className="comment_heading">
            Comment Box{" "}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close_comment"
              onClick={closeCommentBoxHandler}
            />
          </h4>

          {commentsData?.data.length === 0 ? (
            <h4 className="comment_text">No Comments</h4>
          ) : (
            commentsData?.data.map((comment) => (
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
      )}
    </div>
  );
};

export default Feed;
