import dom from './dom.js';

const socket = io();
dom.init(socket);

socket.on('joined', (uname, users, msgs) => {
  dom.displayUser(uname);
  dom.buildUsers(users);
  dom.buildChat(msgs);
});

socket.on('users', (users) => {
  dom.buildUsers(users);
});

socket.on('message', (msgs) => {
  dom.buildChat(msgs);
});
