import axios from 'axios';
const SERVER_API = 'http://localhost:5002/api';

export const getRoomExists = async roomId => {
  const {data} = await axios.get(
    `${SERVER_API}/room-exists/${roomId}`
  );
  return data;
};
