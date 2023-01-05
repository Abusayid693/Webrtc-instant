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

let peers = {};
let streams = [];

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

  peers[connUserSockedId].on('signal', data => {
    // sdp, ice candidates
    const signalData = {
      signal: data,
      connUserSockedId
    };

    wss.signalPeerData(signalData);
  });

  peers[connUserSockedId].on('stream', stream => {
    console.log('new stream came');

    addStream(stream, connUserSockedId);
    streams = [...streams, stream];
  });
};

export const handleSignalingData = data => {
  // save signaling data peer from other user
  const {signal, connUserSockedId} = data;
  peers[connUserSockedId].signal(signal);
};

//ui

const showLocalVideoPreview = stream => {
  const videosContainer = document.getElementById('videos_portal');
  videosContainer.classList.add('videos_portal_styles');
  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video_track_container');
  const videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};

const addStream = (stream, connUserSockedId) => {
  //incoming stream
  const videosContainer = document.getElementById('videos_portal');

  const videoContainer = document.createElement('div');
  videoContainer.id = connUserSockedId;
  videoContainer.classList.add('video_track_container');

  const videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSockedId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};
