import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/userSlice";
import { server } from "../main";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server}/api/v1/user/login`, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(setAuthUser(res.data));
      toast(res.data.message);
      navigate("/");
    } catch (res) {
      toast(res.response.data.message);
    }
    setLoginData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="grid h-screen w-screen justify-center items-center">
      <div className="grid p-8   items-center  text-centerbg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100">
        <h1 className="  text-3xl font-bold text-gray-300 text-center mb-2">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid w-64 gap-2 ">
            <label className=" text-base label-text text-white">
              <span>Username</span>
            </label>
            <input
              className="input input-bordered h-10"
              type="text"
              value={loginData.username}
              onChange={handleChange}
              name="username"
              required
              placeholder="Username"
            />

            <label className=" text-base label-text text-white">
              <span>Password</span>
            </label>
            <input
              autocomplete="current-password"
              className=" input input-bordered h-10"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              required
              name="password"
              placeholder="Password"
            />

            <Link className="text-white " to={"/signup"}>
              <p>Don't have an account? SignUp</p>
            </Link>
            <div className="items-center">
              <button
                type="submit"
                className="btn btn-black btn-sm w-full mt-2 border border-slate-700"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
