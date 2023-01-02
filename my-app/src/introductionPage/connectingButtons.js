import React from 'react';
import ConnectingButton from './connectingButton';
import {useNavigate} from 'react-router-dom';

const ConnectingButtons = () => {
  const navigate = useNavigate();

  const pushToJoinRoomPage = () => {
    navigate('/join-room');
  };

  const pushToJoinRoomPageAsHost = () => {
    navigate('/join-room?host=true');
  };

  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        onClickHandler={pushToJoinRoomPage}
        buttonText={'Join a meeting'}
      />
      <ConnectingButton
        onClickHandler={pushToJoinRoomPageAsHost}
        createRoomButton
        buttonText={'Host a meeting'}
      />
    </div>
  );
};

export default ConnectingButtons;
