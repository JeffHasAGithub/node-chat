import input from './input.js';
import users from './users.js';
import chat from './chat.js';

const socket = io();
input.init(socket);

socket.on('joined', (uname, usrs, msgs) => {
  input.displayUser(uname);
  users.draw(usrs);
  chat.draw(msgs);
});

socket.on('users', (usrs) => {
  users.draw(usrs);
});

socket.on('message', (msgs) => {
  chat.draw(msgs);
});

socket.on('dconnect', (users) => {
});
