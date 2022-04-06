require('dotenv').config();

const sockets = require('./libs/Sockets');

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

sockets(io);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/index.html'));
});

server.listen(process.env.PORT || 8080);
