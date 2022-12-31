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

let connectedUsers = [];
let rooms: any[] = [];

app.get('/api/room-exists/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const room = rooms.find(room => room.id === roomId);

  if (room) {
    if (room.connectedUsers.listen > 3) {
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

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
