import dom from './dom.js';
import chat from './chat.js';

const socket = io();
dom.init(socket);

chat.msgs.clear();

socket.on('joined', (uname, users, msgs) => {
  dom.displayUser(uname);
  dom.buildUsers(users);

  chat.msgs.add(msgs);
  chat.draw();
});

socket.on('users', (users) => {
  dom.buildUsers(users);
});

socket.on('message', (msgs) => {
  console.log(msgs);
  chat.msgs.add(msgs);
  chat.draw();
});

socket.on('dconnect', (users) => {
  dom.buildUsers(users);

});
