import { createSlice } from "@reduxjs/toolkit";

const initState = {
  identity: "",
};

const RtcSlice = createSlice({
  name: "rtc",
  initialState: initState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {


  },
});


export default RtcSlice.reducer

// export {} = RtcSlice.actions