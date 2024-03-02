import axios from "./axios";

const myProfile = async () => {
  return axios
    .get("/profile")
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const userProfile = async (query) => {
  return axios
    .get("/userProfile", {
      params: {
        id: query.userId,
      },
    })
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const search_user = async (data) => {
  return axios
    .post("/user/search", {
      keyword: data.keyword,
    })
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const getAllOnlineUsers = async () => {
  return axios
    .get("/users/online")
    .then((res) => res)
    .catch((e) => console.log(e));
};

export { myProfile, userProfile, search_user, getAllOnlineUsers };
