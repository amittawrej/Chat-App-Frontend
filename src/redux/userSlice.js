import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers:null,
    selectedUsers:null,
    onlineUsers:null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers:(state,action)=>{
      state.otherUsers=action.payload;
    },
    setSelectedUsers:(state,action)=>{
      state.selectedUsers=action.payload;
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers=action.payload;
    },
    logout:(state) =>{
     
        state.authUser= null;
        state.otherUsers=null;
        state.selectedUsers=null;
        state.onlineUsers=null;
      
  },
  }
});
export const {setAuthUser,setOtherUsers,setSelectedUsers,logout,setOnlineUsers}= userSlice.actions;
export default userSlice.reducer;