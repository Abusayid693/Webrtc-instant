import React from 'react';

const ConnectingButton = ({
  createRoomButton = false,
  buttonText,
  onClickHandler
}) => {
  return (
    <button
      onClick={onClickHandler}
      className={createRoomButton ? 'create_room_button' : 'join_room_button'}
    >
      {buttonText}
    </button>
  );
};

export default ConnectingButton;
