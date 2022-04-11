import input from './input.js';
import users from './users.js';
import chat from './chat.js';

const screen = document.getElementById("node-chat");
const conntxt = document.getElementById("connect-text");
const connbtn = document.getElementById("connect-btn");
connbtn.addEventListener("click", (ev) => {
	screen.hidden = false;
	conntxt.hidden = true;
	connbtn.hidden = true;
	socket.connect();
});

const socket = io({ autoConnect: false});
input.init(socket);

socket.on('joined', (uname, usrs, msgs) => {
  input.displayUser(uname);
  users.draw(usrs);
  chat.draw(msgs);
});

socket.on('full', () => {
	screen.hidden = true;
	conntxt.hidden = false;
	connbtn.hidden = false;
	socket.disconnect();
})

socket.on('users', (usrs) => {
  users.draw(usrs);
});

socket.on('message', (msgs) => {
  chat.draw(msgs);
});

socket.on('dconnect', (usrs) => {
  users.draw(usrs);
});
