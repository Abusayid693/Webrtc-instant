import express from 'express';
import http from 'http';
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';
import twilio from 'twilio';
import socket from 'socket.io';

const PORT = 5002;
const app = express();
app.use(cors());

const server = http.createServer(app);

let connectedUsers: {
  identity: any;
  id: string;
  socketId: string;
  roomId: any;
}[] = [];
let rooms: {
  id: string;
  connectedUsers: {
    identity: any;
    id: string;
    socketId: string;
    roomId: string;
  }[];
}[] = [];

app.get('/api/room-exists/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const room = rooms.find(room => room.id === roomId);
  console.log('rooms :', room);

  if (room) {
    if (room.connectedUsers.length > 3) {
      res.status(200).json({
        roomExists: true,
        full: true,
        message: ''
      });
    }

    res.status(200).json({
      roomExists: true,
      full: false,
      message: ''
    });
  } else {
    res.status(404).json({
      roomExists: false,
      message: ''
    });
  }
});

const io = new socket.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log(`user connected to socket with id: ${socket.id}`);

  socket.on('create-new-room', data => {
    console.log(`user is creating a room: ${data}`);
    createNewRoom(data, socket);
  });

  socket.on('join-room', data => {
    console.log(`user is joining a room: ${data}`);
    handleJoinRoom(data, socket);
  });

  socket.on('disconnect', () => {
    handleUserDisconnect(socket);
  });
});

const createNewRoom = (
  data: {
    identity: any;
  },
  socket: socket.Socket<any>
) => {
  const {identity} = data;
  const roomId = uuidv4();

  const user = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId
  };

  connectedUsers.push(user);

  const newRoom = {
    id: roomId,
    connectedUsers: [user]
  };

  socket.join(roomId);
  rooms.push(newRoom);

  socket.emit('room-id', {roomId});
  socket.emit('room-update', {connectedUsers: newRoom.connectedUsers});
};

const handleJoinRoom = (
  data: {
    identity: any;
    roomId: any;
  },
  socket: socket.Socket<any>
) => {
  const {identity, roomId} = data;

  const user = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId
  };

  connectedUsers.push(user);
  socket.join(roomId);

  const room = rooms.find(room => room.id === roomId);
  console.log('room :', room);
  room?.connectedUsers.push(user);

  // send rtc offer to prepare for peer connection
  room?.connectedUsers.forEach((connectedUser)=>{
    if(connectedUser.socketId !== socket.id){
      const offerData = {
        connUserSockedId: socket.id
      }

      io.to(connectedUser.socketId).emit("conn-prepare", offerData)
    }
  })
 
  io.to(roomId).emit('room-update', {connectedUsers: room?.connectedUsers});
};

const handleUserDisconnect = (socket: socket.Socket<any>) => {
  const user = connectedUsers.find(user => user.socketId === socket.id);

  if (user) {
    const room = rooms.find(room => room.id === user.roomId);
    // @ts-ignore
    room.connectedUsers = room?.connectedUsers.filter(
      connectedUser => connectedUser.id != user.id
    );
    socket.leave(user.roomId);

    if (room?.connectedUsers.length) {
      io.to(user.roomId).emit('room-update', {
        connectedUsers: room?.connectedUsers
      });
      return;
    }

    rooms = rooms.filter(r => r.id !== user.roomId);
  }
};

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
