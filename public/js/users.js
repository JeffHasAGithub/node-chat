const users = (function() {
  const usersbox = document.getElementById('users-box');

  function draw(users) {
    usersbox.innerText = '';

    users.forEach((user) => {
      const li = document.createElement('li');  
      li.innerText = `${user.name}`;

      usersbox.appendChild(li);
    });
  }

  return { draw };
})();

export default users;
