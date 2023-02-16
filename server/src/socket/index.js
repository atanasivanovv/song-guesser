const handlers = require('./handlers');

const clients = [];

const setupSocketConnections = (io) => {
  io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`);

    clients.push(socket);

    if (clients.length === 2) {
      io.sockets.emit('game_start', {
        song: 'example_song',
      });
    }

    socket.on('guess', handlers.songGuessHandler(io, socket));

    socket.on('disconnect', () => {
      clients.splice(clients.indexOf(socket), 1);
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = setupSocketConnections;
