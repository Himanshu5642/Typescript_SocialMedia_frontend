import React from "react";
import "./Chats.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newChatOpen } from "../../api/chatApiService";
// import { socket } from "../../socket";

const Chats = ({ chat, receiver, dispatch }) => {
  const queryClient = useQueryClient();
  const formattedUsername = (receiver?.username ?? "")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());

  const newChatOpenMutation = useMutation({
    mutationFn: newChatOpen,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chats"] }),
  });

  const newChatHandler = () => {
    newChatOpenMutation.mutate({ receiver: receiver._id });
    dispatch({ type: "showMessageModel" });
    dispatch({ type: "pass_chat", payload: { chat } });
  };

  return (
    <>
      <div className="chat_box" onClick={newChatHandler}>
        <span className="listFriends">
          <img
            src={"uploads/" + receiver?.profile_pic}
            alt=""
            className="friendimg"
          />
          <span>{formattedUsername}</span>
        </span>
      </div>
      <hr className="hr_chat_line" />
    </>
  );
};

export default Chats;
