const Namegen = require('./Namegen');
const Msgbuff = require('./Msgbuff');
const Userbuff = require('./Userbuff');

const _sockets = function(io) {
  const namegen = Namegen('./res/names.txt');
  const msgbuff = Msgbuff(25);
  const userbuff = Userbuff(50);

  setInterval(() => {
    msgbuff.clear();
    io.emit("message", msgbuff.get("msgs"));
  }, 1800000)

  io.on('connection', (socket) => {
    const id = socket.id;
    const name = namegen.generate();

		const o = userbuff.get("length");
    const n = userbuff.add([{ id, name }]);
		if (o === n)
			io.to(id).emit('full');

    io.to(id).emit('joined', name, userbuff.get("users"), msgbuff.get('msgs'));
    socket.broadcast.emit('users', userbuff.get("users"));

    socket.on('message', (msg) => {
      msgbuff.add(name, [msg])
      
      io.emit('message', msgbuff.get('msgs'));
    });

    socket.on('disconnect', () => {
      userbuff.del(id);
      io.emit('users', userbuff.get("users"));
    });
  });
   
};

const Sockets = function(io) {
  return _sockets(io); 
}

module.exports = Sockets;
