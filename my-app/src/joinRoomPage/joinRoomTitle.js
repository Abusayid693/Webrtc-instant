import React from 'react';

const JoinRoomTitle = ({isRoomHost}) => {
  return (
    <p className="join_room_title">
      {isRoomHost ? 'Host meeting' : 'Join meeting'}
    </p>
  );
};

export default JoinRoomTitle;
