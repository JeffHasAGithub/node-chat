const dom = (function() {
  const chatbox = document.getElementById('chat-box');
  const usersbox = document.getElementById('users-box');
  const inputbox = document.getElementById('input-box');

  function init(socket) {
    inputbox.addEventListener('submit', (ev) => {
      const textarea = inputbox.firstElementChild;

      ev.preventDefault();
      if (textarea.value) {
        socket.emit('message', textarea.value);
        textarea.value = '';
      }
    });
  };

  function displayUser(uname) {
    const textarea = inputbox.firstElementChild;
    textarea.placeholder = `You are ${uname}`;
  }

  function buildChat(msgs) {
    chatbox.innerText = '';

    msgs.forEach((msg) => {
      const li = document.createElement('li');
      li.innerText = msg;

      chatbox.appendChild(li);
    });
  }

  function buildUsers(users) {
    usersbox.innerText = '';

    users.forEach((user) => {
      const li = document.createElement('li');  
      li.innerText = user;

      usersbox.appendChild(li);
    });
  }

  return { init, displayUser, buildChat, buildUsers };
})();

export default dom;
