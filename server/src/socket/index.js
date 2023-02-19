const handlers = require('./handlers');

const clients = {};

const setupSocketConnections = (io) => {
  io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`);
    clients[socket.id] = socket;
    clients[socket.id]['points'] = 0;
    clients[socket.id]['name'] = socket.id;

    socket.on('guess', handlers.songGuessHandler(io, socket, clients));
    if (Object.keys(clients).length >= 2) {
      io.sockets.emit('game_start');
    }

    socket.on('disconnect', () => {
      delete clients[socket.id];
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = setupSocketConnections;
