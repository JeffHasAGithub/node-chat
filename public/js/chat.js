const msgbuff = (function() {
  const max = 25;
  let buffer = [];

  function get(str, i) {
    const lstr = str.toLowerCase();

    let copy = null;
    switch (lstr) {
      case "length":
        copy = buffer.length;
        break;
      case "max":
        copy = max;
        break;
      case "msg":
        if (Number.isinteger(i));
          if (i < buffer.length)
            copy = buffer[i];
          break;
      case "msgs":
        copy = buffer;
        break;
      default:
        break;
    }

    return copy;
  }

  function add(msgs) {
    if (!Array.isArray(msgs))
      return false;

    msgs.forEach((msg) => {
      const li = document.createElement('li');
      li.innerText = msg;

      if (!li)
        return false;

      if (buffer.length >= max)
        buffer.shift();

      buffer.push(li)
    });
  }

  function clear() {
    buffer = []; 
  }

  return { add, get, clear };
});

const chat = (function() {
  const chatbox = document.getElementById('chat-box');

  const msgs = msgbuff();

  function draw() {
    chatbox.innerText = '';

    msgs.get('msgs').forEach((msg) => {
      chatbox.appendChild(msg);
    });
  }

  return { msgs, draw };
})();


export default chat;
