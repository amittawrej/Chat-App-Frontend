import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import store from "../redux/store";

const MessageContainer = () => {
  const { selectedUsers } = useSelector((store) => store.user);
  const {authUser}=useSelector(store=>store.user);
  return (
    <>
      {selectedUsers !== null ? (
        <div className="sm:min-w-[350px] md:min-w-[550px] flex flex-col">
          <div className="flex items-center gap-3 bg-zinc-800 px-4 py-2 mb-2">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={selectedUsers?.profilePhoto} alt="user profile" />
              </div>
            </div>
            <div className="">
              <div className="flex gap-2 flex-1 ">
                <p className="text-white"> {selectedUsers?.fullname}</p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className="sm:min-w-[350px] md:min-w-[550px] flex flex-col justify-center items-center">
          <p className="text-white">Hi, {authUser?.fullname}</p>
          <h1 className="text-white font-bold text-lg">Let's Start Conversation</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
