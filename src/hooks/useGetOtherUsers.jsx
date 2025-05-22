import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import { server } from "../main";
const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  return useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get( `${server}/api/v1/user`);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
