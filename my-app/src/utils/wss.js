import io from 'socket.io-client';
import store from '../store';
import {setRoomId, setParticipants} from '../store/slice';
import * as WebRTCHandler from "./webRTCHandler"

const SERVER = 'http://localhost:5002';

let socket = null;

export const connectWithSocketIOServer = () => {
  socket = io(SERVER);

  socket.on('connect', () => {
    console.log(`socket io connected id: ${socket.id}`);
  });

  socket.on('room-id', data => {
    const {roomId} = data;
    store.dispatch(setRoomId(roomId));
  });

  socket.on('room-update', data => {
    const {connectedUsers} = data;
    store.dispatch(setParticipants(connectedUsers));
  });

  socket.on("conn-prepare", (data)=>{
    const {connUserSockedId} = data;
    WebRTCHandler.prepareNewPeerConnection(connUserSockedId, false)
  })
};

export const createNewRoom = identity => {
  const data = {
    identity
  };
  socket.emit('create-new-room', data);
};

export const joinRoom = (identity, roomId) => {
  const data = {
    identity,
    roomId
  };

  socket.emit('join-room', data);
};

export const leaveRoom = () => {
  socket.disconnect();
};
