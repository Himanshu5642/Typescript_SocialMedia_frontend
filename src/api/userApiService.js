import axios from "./axios";

const myProfile = async () => {
  try {
    return await axios.get("/profile");
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const userProfile = async (query) => {
  try {
    return await axios.get("/userProfile", {
      params: {
        id: query.userId
      }
    });
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const search_user = async (data) => {
  try {
    return await axios.post("/user/search", {
      keyword: data.keyword
    });
  } catch (error) {
    console.log(error.response.data.body);
  }
};

export { myProfile, userProfile, search_user };
