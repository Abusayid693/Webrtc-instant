import {createSlice} from '@reduxjs/toolkit';

const initState = {
  identity: '',
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: null,
  showOverlay: true
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
    },

    setRoomId: (state, {payload}) => {
      state.roomId = payload;
    },

    setIdentity: (state, {payload}) => {
      state.identity = payload;
    },

    setShowOverlay: (state, {payload}) => {
      state.showOverlay = payload;
    }
  }
});

export default RtcSlice.reducer;

export const {
  setIsRoomHost,
  setConnectOnlyWithAudio,
  setShowOverlay,
  setRoomId,
  setIdentity
} = RtcSlice.actions;
