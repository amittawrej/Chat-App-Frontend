import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../redux/messageSlice'
import { server } from '../main'

const useGetMessage = () => {
    const {selectedUsers}=useSelector(store=>store.user)
    
    const dispatch=useDispatch();
  return (
    useEffect(()=>{
        const fetchMessage=async()=>{
            try {
                axios.defaults.withCredentials=true;
                const res= await axios.get( `${server}/api/v1/message/get/${selectedUsers?._id}`);
                console.log(res);
                dispatch(setMessage(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchMessage();
    },[selectedUsers, setMessage])
  )
  
}

export default useGetMessage