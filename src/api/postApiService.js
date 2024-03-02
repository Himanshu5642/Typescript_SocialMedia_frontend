import axios, { formDataAxios } from "./axios";

const addPost = async (data) => {
  return formDataAxios
    .post("/createPost", data)
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const getAllPosts = async () => {
  return axios
    .get("/allPosts")
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const myPosts = async (query) => {
  return axios
    .get("/myPosts", {
      params: {
        type: query.type,
      },
    })
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const userPosts = async (query) => {
  return axios
    .get("/userPosts", {
      params: {
        userId: query.userId,
        type: query.type,
      },
    })
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const getPostByIdOrType = async (query) => {
  return axios
    .get("/post")
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const distinguishPostByCategory = async (query) => {
  return axios
    .get("/post/categories")
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const updatePost = async (id) => {
  return axios
    .put("/post")
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const deletePost = async (id) => {
  return axios
    .delete("/post/" + id)
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const likeUnlikePost = async (data) => {
  return axios
    .post("/post/like", {
      content_type: data.type,
      content_id: data.postId,
    })
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const likeUnlikeComment = async (data) => {
  return axios
    .post("/comment/like", {
      content_type: "comment",
      comment_id: data.commentId,
    })
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const getLikes = async (query) => {
  return axios
    .get("/likes")
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const addComment = async (data) => {
  return axios
    .post("/post/comment", {
      content_type: data.content_type,
      content: data.content,
      content_id: data.content_id,
    })
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const getAllComments = async (query) => {
  return axios
    .get("/allComments", {
      params: {
        postId: query.postId,
      },
    })
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const updateComment = async (query, data) => {
  return axios
    .put("/comment")
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const deleteComment = async (id, query) => {
  return axios
    .delete("/comment")
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

export {
  addPost,
  getAllPosts,
  myPosts,
  userPosts,
  getPostByIdOrType,
  distinguishPostByCategory,
  updatePost,
  deletePost,
  likeUnlikePost,
  likeUnlikeComment,
  getLikes,
  addComment,
  getAllComments,
  updateComment,
  deleteComment,
};
