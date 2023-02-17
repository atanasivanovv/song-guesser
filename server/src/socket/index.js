const handlers = require('./handlers');

const clients = [];

const setupSocketConnections = (io) => {
  io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`);
    clients.push(socket);

    socket.on('guess', handlers.songGuessHandler(io, socket));
    if (clients.length >= 2) {
      io.sockets.emit('game_start', {
        songs: [
          'https://soundbible.com/mp3/Tyrannosaurus%20Rex%20Roar-SoundBible.com-807702404.mp3',
        ],
      });
    }

    socket.on('disconnect', () => {
      clients.splice(clients.indexOf(socket), 1);
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = setupSocketConnections;
