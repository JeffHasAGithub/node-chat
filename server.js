require('dotenv').config();
const JNameGen = require('./libs/JNameGen');

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/index.html'));
});

/////////////////////////////////////////////////////////////////

const namegen = JNameGen('./res/names.txt');

const users = [];
const messages = [];

io.on('connection', (socket) => {
  const uname = namegen.generate();
  const idx = users.push(uname) - 1;

  socket.emit('joined', uname, users, messages);
  socket.broadcast.emit('users', users);

  socket.on('message', (msg) => {
    if (messages.length >= 20)
      messages.shift();
    
    messages.push(`${uname}:\n\n${msg}`);
    io.emit('message', messages);
  });

  socket.on('disconnect', () => {
    users.splice(idx, 1); 
    io.emit('users', users);
  });
});

server.listen(process.env.PORT || 3000);
