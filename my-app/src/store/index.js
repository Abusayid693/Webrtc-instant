import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import rtcReducer from './slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    rtc: rtcReducer
  }
});

export default store;
