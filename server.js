require('dotenv').config();
const JNameGen = require('./libs/JNameGen');
const msgbuff = require('./libs/msgbuff');
const userbuff = require('./libs/userbuff');

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
const messages = msgbuff(25);
const users = userbuff(25);

io.on('connection', (socket) => {
  const id = socket.id;
  const name = namegen.generate();

  const idx = users.add([{ id, name }]);

  socket.emit('joined', name, users.get("users"), messages.get('msgs'));
  socket.broadcast.emit('users', users.get("users"));

  socket.on('message', (msg) => {
    messages.add(name, [msg])
    
    io.emit('message', messages.get('msgs'));
  });

  socket.on('disconnect', () => {
  });
});

server.listen(process.env.PORT || 8080);
