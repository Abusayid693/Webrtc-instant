import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import './roomPage.css';
import * as webRTCHandler from '../utils/webRTCHandler';
// --
import VideoSection from './videoSection/videoSection';
import ChatSection from './chatSection/chatSection';
import ParticipantsSection from './participantsSection/participantsSection';
import RoomLabel from './roomLabel';
import Overlay from './overlay';

const RoomPage = () => {
  const {
    roomId,
    isRoomHost,
    identity,
    showOverlay
  } = useSelector(state => state.rtc);

  useEffect(() => {
    webRTCHandler.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId
    );
  }, []);

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {showOverlay && <Overlay />}
    </div>
  );
};

export default RoomPage;
