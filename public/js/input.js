const input = (function() {
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
  }

  function displayUser(usr) {
    if (!usr)
      return;

    const textarea = inputbox.firstElementChild;
    textarea.placeholder = `You are ${usr}`;
  }

  return { init, displayUser };
})();

export default input;
