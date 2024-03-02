import axios from "./axios";

const newChatOpen = async (data) => {
  return axios
    .post("/chats/new", data)
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const getAllChats = async () => {
  return axios
    .get("/chats", {
      params: {
        type: "single",
      },
    })
    .then((res) => res)
    .catch((error) => console.log(error.response.data.body));
};

const getAllMessages = async (query) => {
  return axios
    .get("/messages", {
      params: {
        conversationId: query.id,
      },
    })
    .then((res) => res)
    .catch((err) => console.log(err));
};

export { newChatOpen, getAllChats, getAllMessages };
