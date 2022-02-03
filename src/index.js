// index.js
import http from 'http';
import handler from 'serve-handler';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';

import Player from './data/player.js';

const players = [];
const app = express();

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: './frontend',
  });
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`connected: ${socket.id}`);
  socket.on('login', (username) => {
    console.log(`Logged as ${username}`);
    socket.emit('loggedIn', username, '123');
  });
});

const PORT = 3001;
// app.use(cors());
// app.listen(PORT);
// console.log('Server is running');

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
