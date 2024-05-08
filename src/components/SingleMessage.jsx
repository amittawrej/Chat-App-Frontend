import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUsers } = useSelector((store) => store.user);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  
  return (
    <div ref={scroll}>
      <div
        className={`chat ${
          authUser?._id === message?.senderId ? "chat-end" : "chat-start"
        } `}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={`${
                authUser?._id === message?.senderId
                  ? authUser?.profilePhoto
                  : selectedUsers?.profilePhoto
              }`}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50 text-white">12:45</time>
        </div>
        <div className="chat-bubble">{message?.message}</div>
      </div>
    </div>
  );
};

export default SingleMessage;
