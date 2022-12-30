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

const io = new socket.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
