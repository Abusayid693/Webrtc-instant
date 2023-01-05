import io from 'socket.io-client';
import store from '../store';
import {setRoomId, setParticipants} from '../store/slice';
import * as WebRTCHandler from './webRTCHandler';

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

  // for existing user
  socket.on('conn-prepare', data => {
    const {connUserSockedId} = data;
    WebRTCHandler.prepareNewPeerConnection(connUserSockedId, false);

    // tell the user who is trying to join that we have prepared peer connection
    socket.emit('conn-init', {connUserSockedId});
  });

  // for both existing and new
  socket.on('conn-signal', data => {
    WebRTCHandler.handleSignalingData(data);
  });

  // for joiner side
  socket.on('conn-init', data => {
    const {connUserSockedId} = data;
    WebRTCHandler.prepareNewPeerConnection(connUserSockedId, true);
  });
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

// share sdp, ice candidates between servers
export const signalPeerData = data => {
  socket.emit('conn-signal', data);
};

export const leaveRoom = () => {
  socket.disconnect();
};
