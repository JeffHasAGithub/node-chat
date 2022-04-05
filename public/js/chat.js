const chat = (function() {
  const chatbox = document.getElementById('chat-box');

  function draw(msgs) {
    chatbox.innerText = "";

    msgs.forEach((msg) => {
      const li = document.createElement('li');
      li.innerText = `${msg.user}\n\n${msg.text}`;

      chatbox.appendChild(li);
    });
  }

  return { draw };
})();


export default chat;
