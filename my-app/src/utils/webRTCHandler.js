import store from '../store';
import {setShowOverlay} from '../store/slice';
import * as wss from './wss';
import Peer from 'simple-peer';

const defaultConstraints = {
  audio: true,
  video: true
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = (
  isRoomHost,
  identity,
  roomId = null
) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then(stream => {
      localStream = stream;
      showLocalVideoPreview(localStream);
      store.dispatch(setShowOverlay(false));
      isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity, roomId);
    })
    .catch(err =>
      console.log(
        `Error occured at ${__dirname}.getLocalPreviewAndInitRoomConnection: ${err}`
      )
    );
};

const showLocalVideoPreview = stream => {};

let peers = {};
let streams = []

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
  };
};

export const prepareNewPeerConnection = (connUserSockedId, isInitiator) => {
  const configuration = getConfiguration();

  peers[connUserSockedId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream
  });

  peers[connUserSockedId].on("stream", (stream)=>{
    console.log('new stream came');

    addStream(stream, connUserSockedId);
    streams = [...streams, stream];
  })
};

const addStream = ()=>{
//incoming stream
}