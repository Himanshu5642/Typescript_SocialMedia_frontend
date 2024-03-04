import React, { useEffect, useReducer, useRef } from "react";
import "./Chats.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllMessages } from "../../api/chatApiService";
import { socket } from "../../socket";
import { getFileUrl } from "../../config/firebase";
import MessageBox from "./MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "text_input":
      return {
        ...state,
        textInput: {
          conversation: action.chatId,
          [action.field]: action.value,
        },
      };
    case "receiverProfileImageUrl":
      return { ...state, receiverProfilePicImageUrl: action.payload.url };
    default:
      return state;
  }
};

function MessageModel({ dispatchFunc, chat }) {
  let queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, {
    textInput: { text: "" },
    receiverProfilePicImageUrl: null,
  });
  const bottomMessageViewRef = useRef(null);

  const formattedUsername = (chat?.receivers[0].username ?? "")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());

  const { data: messageData, isLoading } = useQuery({
    queryKey: ["messages", chat],
    queryFn: () => getAllMessages({ id: chat._id }),
  });

  const messageInputHandler = (e) => {
    dispatch({
      type: "text_input",
      field: e.target.name,
      value: e.target.value,
      chatId: chat._id,
    });
  };
  // console.log("textinput", state.textInput);

  const sendMessageHandler = () => {
    dispatch({
      type: "text_input",
      field: "text",
      value: "",
      chatId: chat._id,
    });
    socket.emit("sendMessage", state.textInput);
    queryClient.invalidateQueries({ queryKey: ["messages"] });
  };

  useEffect(() => {
    socket.on("messageReceiver", (data) =>
      queryClient.invalidateQueries({ queryKey: ["messages"] })
    );

    socket.on("getOnlineUsers", (data) => {
      console.log("users", data);
    });

    if (messageData?.data.length)
      bottomMessageViewRef.current?.scrollIntoView();
  }, [queryClient, messageData?.data.length]);

  useEffect(() => {
    (async function () {
      await getFileUrl("profile", chat?.receivers[0].profile_pic).then((res) =>
        dispatch({ type: "receiverProfileImageUrl", payload: { url: res } })
      );
    })();
  }, [chat?.receivers]);

  return (
    <div className="message_model">
      <div className="message_header">
        <img
          src={state.receiverProfilePicImageUrl}
          alt=""
          className="message_userProfile friendimg"
        />
        <span className="message_username">{formattedUsername}</span>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="close_chat_box"
          onClick={() => dispatchFunc({ type: "closeMessageModel" })}
        />
      </div>

      {!isLoading &&
        messageData?.data.map((message) => (
          <MessageBox key={message._id} message={message} />
        ))}
      <div ref={bottomMessageViewRef}></div>

      <div className="message_input_div">
        <input
          type="text"
          name="text"
          id="message_input"
          value={state.textInput.text}
          onChange={messageInputHandler}
        />
        <FontAwesomeIcon
          icon={faPaperPlane}
          id="message_send_icon"
          className="comment_send"
          onClick={sendMessageHandler}
        />
      </div>
    </div>
  );
}

export default MessageModel;
