import React, { useEffect, useReducer, useRef } from "react";
import "./Chats.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllMessages } from "../../api/chatApiService";
import { socket } from "../../socket";

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
    default:
      return state;
  }
};

function MessageModel({ dispatchFunc, chat }) {
  let queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, { textInput: { text: "" } });
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
  console.log("textinput", state.textInput);

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

  return (
    <div className="message_model">
      <div className="message_header">
        <img
          src={"uploads/" + chat?.receivers[0].profile_pic}
          alt=""
          className="message_userProfile friendimg"
        />
        <span className="message_username">{formattedUsername}</span>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="close_chat_box"
          onClick={() => dispatchFunc({ type: "showMessageModel" })}
        />
      </div>

      {!isLoading &&
        messageData?.data.map((message) => {
          let isSender = message.sender._id === localStorage.getItem("userId");
          return (
            <div
              key={message._id}
              className={`messageBox ${isSender && "rightSideMessage"}`}
            >
              <img
                src={"uploads/" + message.sender.profile_pic}
                alt=""
                className="message_userProfile friendimg"
              />
              <div>
                <span className="name_shown">
                  {message.sender.username
                    .trim()
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </span>
                <span className="text_pointer"></span>
                <p className="text_shown">{message.text}</p>
              </div>
            </div>
          );
        })}
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
