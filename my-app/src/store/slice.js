import {createSlice} from '@reduxjs/toolkit';

const initState = {
  identity: '',
  isRoomHost: false,
  connectOnlyWithAudio: false
};

const RtcSlice = createSlice({
  name: 'rtc',
  initialState: initState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setIsRoomHost: (state, {payload}) => {
      state.isRoomHost = payload;
    },

    setConnectOnlyWithAudio: (state, {payload}) => {
      state.connectOnlyWithAudio = payload;
    }
  }
});

export default RtcSlice.reducer;

export const {setIsRoomHost, setConnectOnlyWithAudio} = RtcSlice.actions;
