import React, { useReducer } from "react";
import "./Sidebar.css";
import Chats from "../chats/Chats";
import { useQuery } from "@tanstack/react-query";
import { getAllChats } from "../../api/chatApiService";
import MessageModel from "../chats/MessageModel";
// import { socket } from "../../socket";

const reducer = (state, action) => {
  switch (action.type) {
    case "showMessageModel":
      return { ...state, showMessageModel: true };
    case "closeMessageModel":
      return { ...state, showMessageModel: false };
    case "pass_chat":
      return { ...state, currentChat: action.payload.chat };
    default:
      return state;
  }
};

const Sidebar = () => {
  const [state, dispatch] = useReducer(reducer, {
    showMessageModel: false,
    currentChat: null,
  });

  const { data: chatUserData } = useQuery({
    queryKey: ["chats"],
    queryFn: getAllChats,
  });

  return (
    <>
      <div className="sidebar">
        <div className="sideWrap">
          <h2>Chats</h2>
          <hr className="hrLine" />
          <div className="sideFriends">
            {chatUserData?.data.map((chat) => (
              <Chats
                key={chat._id}
                chat={chat}
                receiver={chat.receivers[0]}
                dispatch={dispatch}
              />
            ))}
          </div>
        </div>
      </div>
      {state.showMessageModel && <MessageModel dispatchFunc={dispatch} chat={state.currentChat}  />}
    </>
  );
};

export default Sidebar;
