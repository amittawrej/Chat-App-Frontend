import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUsers } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const selectedUserHandler = (user) => {
    console.log(user);
    dispatch(setSelectedUsers(user));
  };
  
  const { selectedUsers, onlineUsers } = useSelector((store) => store.user);
  const isOnline= onlineUsers && onlineUsers.includes(user._id)
  return (
    <div>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUsers === user ? "bg-zinc-700" : ""
        } flex items-center gap-3 hover:bg-zinc-700 rounded-lg p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ?  'online' : '' }`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="user profile" />
          </div>
        </div>
        <div className="">
          <div className="flex gap-2 flex-1 ">
            <p className="text-white"> {user.fullname}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </div>
  );
};

export default OtherUser;
