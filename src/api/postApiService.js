import axios from "./axios";

const addPost = async (data) => {
  try {
    let res = await axios.post("/createPost");
    return res;;
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const getAllPosts = async () => {
  try {
    let res = await axios.get("/allPosts");
    return res;;
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const myPosts = async (query) => {
  try {
    let res = await axios.get("/myPosts");
    return res;;
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const getPostByIdOrType = async (query) => {
  try {
    let res = await axios.get("/post");
    return res;;
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const distinguishPostByCategory = async (query) => {
  try {
    let res = await axios.get("/post/categories");
    return res;;
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const updatePost = async (id) => {
  try {
    let res = await axios.put("/post");
    return res;;
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const deletePost = async (id) => {
  try {
    let res = await axios.delete("/post");
    return res;;
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const likeUnlikePost = async (data) => {
  try {
    return await axios.post("/post/like", {
      "content_type": data.type,
      "content_id": data.postId
    });
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const likeUnlikeComment = async (data) => {
  try {
    return await axios.post("/comment/like", {
      "content_type": "comment",
      "comment_id": data.commentId
    });
  } catch (error) {
    console.log(error.response.data.body);
  }
};
 
const getLikes = async (query) => {
  try {
    let res = await axios.get("/likes");
    return res;;
  } catch (error) {
    console.log(error.response.data.body);
  }
};
 
const addComment = async (data) => {
  try {
    let res = await axios.post("/post/comment");
    return res;;
  } catch (error) {
    console.log(error.response.data.body);
  }
};
 
const getAllComments = async (query) => {
  try {
    let res = await axios.get("/allComments", { 
      params: {
        postId: query.postId
      }
    });
    return res;;
  } catch (error) {
    console.log(error.response.data.body);
  }
};
 
const updateComment = async (query, data) => {
  try {
    let res = await axios.put("/comment");
    return res;;
  } catch (error) {
    console.log(error.response.data.body);
  }
};
 
const deleteComment = async (id, query) => {
  try {
    let res = await axios.delete("/comment");
    return res;;
  } catch (error) {
    console.log(error.response.data.body);
  }
};
 
export { 
  addPost,
  getAllPosts,
  myPosts,
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
  deleteComment
};
