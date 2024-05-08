import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";

import OtherUser from "./OtherUser";
import AllUsers from "./AllUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setAuthUser, setSelectedUsers } from "../redux/userSlice";
import { server } from "../main";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedUsers, otherUsers } = useSelector((store) => store.user);
  const [search, setSearch] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 charcters long");
    }
    const conversation = otherUsers.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      dispatch(setSelectedUsers(conversation));
      setSearch("");
    } else toast.error("No such user found");
  };
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${server}/api/v1/user/logout`);
      dispatch(logout());
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 border-r border-slate-500 flex flex-col">
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          className="input input-bordered rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="btn btn-circle bg-zinc-400">
          <IoSearch size={24} />
        </button>
      </form>
      <div className="divider"></div>
      <AllUsers />
      <div onClick={logoutHandler} className="btn btn-sm mt-2">
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
