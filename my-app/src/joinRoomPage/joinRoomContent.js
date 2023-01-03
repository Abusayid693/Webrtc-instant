import React, {useState} from 'react';
import JoinRoomInputs from './joinRoomInputs';
import {useSelector} from 'react-redux';
import {getRoomExists} from '../utils/api';
import {useNavigate} from 'react-router-dom';
import {setRoomId, setIdentity} from '../store/slice';
import {useDispatch} from 'react-redux';
//--
import OnlyWithAudioCheckbox from './joinRoomCheckbox';
import ErrorMessage from './errorMessage';
import JoinRoomButtons from './joinRoomButtons';

const JoinRoomContent = () => {
  const [roomId, setRoomIdValue] = useState('');
  const [name, setNameValue] = useState('');
  const {isRoomHost} = useSelector(state => state.rtc);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoinRoom = async () => {
    console.log('handleJoinRoom');
    if (isRoomHost) {
      createRoom();
    } else await joinRoom();
  };

  const createRoom = () => {
    dispatch(setIdentity(name));
    navigate('/room');
  };

  const joinRoom = async () => {
    try {
      const responseMessage = await getRoomExists(roomId);
      const {roomExists, full} = responseMessage;
      console.log('responseMessage :', responseMessage);
      if (roomExists) {
        if (full) {
          setErrorMessage('Meeting is full. Please try again later.');
        } else {
          // join a room !
          console.log('else :', responseMessage);
          dispatch(setRoomId(roomId));
          dispatch(setIdentity(name));
          navigate('/room');
        }
      }
    } catch (error) {
      setErrorMessage('Server error');
      console.log('err :', error);
    }
  };

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomId}
        setRoomIdValue={setRoomIdValue}
        nameValue={name}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckbox />
      <ErrorMessage errorMessage={errorMessage} />
      <JoinRoomButtons
        handleJoinRoom={handleJoinRoom}
        isRoomHost={isRoomHost}
      />
    </>
  );
};

export default JoinRoomContent;
