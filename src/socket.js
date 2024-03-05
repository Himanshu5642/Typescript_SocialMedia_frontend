import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? "https://main--socialmedia34.netlify.app" : "http://localhost:4430";

const token = localStorage.getItem("token");

export const socket = io(URL, {
  extraHeaders: {
    token,
  },
});
