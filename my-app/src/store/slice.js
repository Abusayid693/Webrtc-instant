import { createSlice } from "@reduxjs/toolkit";

const initState = {
  identity: "",
  isRoomHost: false
};

const RtcSlice = createSlice({
  name: "rtc",
  initialState: initState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setIsRoomHost: (state, {payload})=>{
      state.isRoomHost = payload
    }
  },
});


export default RtcSlice.reducer

export const {setIsRoomHost} = RtcSlice.actions;