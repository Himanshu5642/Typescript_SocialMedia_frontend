import React, { useState } from "react";
import "./Story.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import PostModal from "./MyModal";
import { addPost } from "../../api/postApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Story = () => {
  const queryClient = useQueryClient();
  const [showList, setShowList] = useState(false);
  const clickToWatchTheList = () => setShowList(!showList);
  const [showModal, setShowModal] = useState(false);
  const [postInput, setPostInput] = useState({
    content_type: "post",
    media_type: "",
    images: "",
    category: "65e58731b1871d281c93fa84",
    message: "",
    // visibility: "",
    caption: "",
    thumbnail: "",
    // hash_tags: [],
    // mentions: [],
    // location: "",
    // only_close_friends: false,
  });
  const [file, setFile] = useState(false);
  // console.log("postInut", postInput)
  const newPostChangeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.type === "file") {
      setPostInput((prev) => ({
        ...prev,
        images: e.target.files[0],
      }));
      setFile(e.target.files[0]);
    } else {
      setPostInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const createPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const newPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in postInput) {
      console.log(key, postInput[key]);
      formData.append(key, postInput[key]);
    }
    createPostMutation.mutate(formData);
    setShowModal(false);
    setPostInput({
      content_type: "post",
      media_type: "",
      images: "",
      category: "65a4ddf25693125174f0699c",
      message: "",
      visibility: "",
      caption: "",
    });
    setFile(false);
  };

  return (
    <>
      <div className="story">
        <div className="newStory">
          <div>
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="add_icon"
              onClick={clickToWatchTheList}
            />
            {showList && (
              <div className="add_list">
                <span id="box_upper_pointer"></span>
                <Button
                  onClick={() => setShowModal(true)}
                  className="list_span"
                >
                  {" "}
                  Post
                </Button>
                <hr className="add_list_hr" />
                <Button
                  onClick={() => setShowModal(true)}
                  className="list_span"
                >
                  {" "}
                  Story
                </Button>
              </div>
            )}
          </div>
          <div className="storyBox">
            <img src="./assets/1.jpg" alt="" />
          </div>
        </div>
      </div>

      <PostModal
        show={showModal}
        onHide={() => setShowModal(false)}
        newPost={newPost}
        newPostChangeHandler={newPostChangeHandler}
        file={file}
      />
    </>
  );
};

export default Story;
