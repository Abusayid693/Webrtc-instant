import React, {useState} from 'react';
import JoinRoomInputs from './joinRoomInputs';
import {useSelector} from 'react-redux';

import OnlyWithAudioCheckbox from './joinRoomCheckbox';
import ErrorMessage from './errorMessage';

const JoinRoomContent = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const {isRoomHost} = useSelector(state => state.rtc);
  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomId}
        setRoomIdValue={setRoomId}
        nameValue={name}
        setNameValue={setName}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckbox />
      <ErrorMessage errorMessage={'ErrorMessage'} />
    </>
  );
};

export default JoinRoomContent;
