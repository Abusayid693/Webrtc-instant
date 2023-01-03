import store from '../store';
import {setShowOverlay} from '../store/slice';
import * as wss from './wss';

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
