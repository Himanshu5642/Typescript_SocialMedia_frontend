import axios from "./axios";

const myProfile = async () => {
  try {
    let posts = await axios.get("/profile");
    return posts;
  } catch (error) {
    console.log(error.response.data.body);
  }
};

const getUserProfile = async (query) => {
  try {
    let posts = await axios.get("/userProfile");
    return posts;
  } catch (error) {
    console.log(error.response.data.body);
  }
};

export { 

 };
