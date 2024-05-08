import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/messageSlice";
import { server } from "../main";
const SendInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // alert(newMessage);
      const res = await axios.post(`
        ${server}/api/v1/message/send/${selectedUsers._id}`,
        { message: newMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res);
      dispatch(setMessage([...messages, res.data.newMessage]));
    } catch (error) {
      console.log(error);
    }
    setNewMessage("");
   
  };
  return (
    <form className="px-4 py-2" onSubmit={submitHandler}>
      <div className="w-full relative">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Send Message..."
          className="p-2 border-zinc-500 border text-sm rounded-lg w-full bg-gray-600 text-white"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-3"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
