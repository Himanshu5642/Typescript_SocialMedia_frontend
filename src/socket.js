import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:4430";

const token = localStorage.getItem("token");

export const socket = io(URL, {
  extraHeaders: {
    token,
  },
});
