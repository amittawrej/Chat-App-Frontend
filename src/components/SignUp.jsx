import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../main";

const SignUp = () => {
  const navigate=useNavigate();
  const [data, setData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const handleGenderChange = (e) => {
    setData({
      ...data,
      gender: e.target.value,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSumbmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${server}/api/v1/user/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast(res.data.message);
      navigate('/login');
    } catch (res) {
      toast(res.response.data.message);
    }
    setData({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="grid h-screen w-screen justify-center items-center">
      <div className="grid p-8   items-center  text-centerbg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100">
        <h1 className="  text-3xl font-bold text-gray-300 text-center mb-2">
          Sign Up
        </h1>

        <form onSubmit={handleSumbmit}>
          <div className="grid w-64 gap-2 ">
            <label className="text-base label-text text-white">
              <span>Full Name</span>
            </label>
            <input
              className="w-64 input input-bordered h-10"
              type="text"
              value={data.fullname}
              onChange={handleChange}
              name="fullname"
              placeholder="Full Name"
            />

            <label className=" text-base label-text text-white">
              <span>Username</span>
            </label>
            <input
              className="input input-bordered h-10"
              type="text"
              value={data.username}
              onChange={handleChange}
              name="username"
              placeholder="Username"
            />

            <label className=" text-base label-text text-white">
              <span>Password</span>
            </label>
            <input
              className=" input input-bordered h-10"
              type="password"
              value={data.password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
            />

            <label className=" text-base label-text text-white">
              <span>Confirm Password</span>
            </label>
            <input
              className="input input-bordered h-10"
              type="password"
              value={data.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              placeholder="Password"
            />
            <div className="flex gap-3 m-2 ">
              <div className="flex">
                <p className="text-white">Male:</p>
                <input
                  type="checkbox"
                  value="male"
                  checked={data.gender === "male"}
                  onChange={handleGenderChange}
                  className="checkbox ml-2"
                />
              </div>
              <div className="flex">
                <p className="text-white">Female:</p>
                <input
                  type="checkbox"
                  value="female"
                  checked={data.gender === "female"}
                  onChange={handleGenderChange}
                  className="checkbox ml-2"
                />
              </div>
            </div>

            <Link className="text-white " to={"/login"}>
              <p>Already have an account? Login</p>
            </Link>
            <div className="items-center">
              <button
                type="submit"
                className="btn btn-black btn-sm w-full mt-2 border border-slate-700"
              >
                SignUp
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
