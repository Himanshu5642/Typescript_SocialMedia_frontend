import React, { useEffect, useState } from "react";
import { getFileUrl } from "../../config/firebase";

function MessageBox({ message }) {
  let isSender = message.sender._id === localStorage.getItem("userId");
  const [senderProfilePicImageUrl, setSenderProfilePicImageUrl] =
    useState(null);

  useEffect(() => {
    const assignSenderProfiles = async () =>
      await getFileUrl("profile", message.sender.profile_pic).then((res) =>
        setSenderProfilePicImageUrl(res)
      );
    assignSenderProfiles();
  }, [message.sender.profile_pic]);

  return (
    <div
      key={message._id}
      className={`messageBox ${isSender && "rightSideMessage"}`}
    >
      <img
        src={senderProfilePicImageUrl}
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
}

export default MessageBox;
