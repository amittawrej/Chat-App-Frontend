import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import './App.css'
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
import { server } from "./main";
const App = () => {
  const { authUser } = useSelector((store) => store.user);
const {socket}=useSelector(store=>store.socket);
  const dispatch = useDispatch();


  useEffect(() => {
    if (authUser) {
      const socket = io(`${server}`, {
        query: {
          userId: authUser._id,
        },
      });
     
      console.log(socket);
      dispatch(setSocket(socket));

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return ()=>socket.close();
    }
    else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
    
  }, [authUser]);
  return (
    <div className="h-screen ">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
