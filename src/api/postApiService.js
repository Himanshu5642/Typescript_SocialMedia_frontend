import axios, { formDataAxios } from "./axios";

const addPost = async (data) => {
  try {
    return await formDataAxios.post("/createPost", data);
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const getAllPosts = async () => {
  try {
    return await axios.get("/allPosts");
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const myPosts = async (query) => {
  try {
    return await axios.get("/myPosts", {
      params: {
        type: query.type
      }
    });
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const userPosts = async (query) => {
  try {
    return await axios.get("/userPosts", {
      params: {
        userId: query.userId,
        type: query.type
      }
    });
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const getPostByIdOrType = async (query) => {
  try {
    return await axios.get("/post");
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const distinguishPostByCategory = async (query) => {
  try {
    return await axios.get("/post/categories");
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const updatePost = async (id) => {
  try {
    return await axios.put("/post");
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const deletePost = async (id) => {
  try {
    return await axios.delete("/post/" + id);
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
    return await axios.get("/likes");
  } catch (error) {
    console.log(error.response.data.body);
  }
};
 
const addComment = async (data) => {
  try {
    return await axios.post("/post/comment",{
      content_type: data.content_type,
      content: data.content,
      content_id: data.content_id
  });
  } catch (error) {
    console.log(error.response.data.body);
  }
};
 
const getAllComments = async (query) => {
  try {
    return await axios.get("/allComments", { 
      params: {
        postId: query.postId
      }
    });
  } catch (error) {
    console.log(error.response.data.body);
  }
};
 
const updateComment = async (query, data) => {
  try {
    return await axios.put("/comment");
  } catch (error) {
    console.log(error.response.data.body);
  }
};
 
const deleteComment = async (id, query) => {
  try {
    return await axios.delete("/comment");
  } catch (error) {
    console.log(error.response.data.body);
  }
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
  deleteComment
};
