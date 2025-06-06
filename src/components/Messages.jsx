import React from "react";
import SingleMessage from "./SingleMessage";
import useGetMessage from "../hooks/useGetMessage";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

const Messages = () => {
  useGetMessage();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages && messages.map((message) => {
        return <SingleMessage key={message._id} message={message} />;
      })}
    </div>
  );
};

export default Messages;
