const encryptService = require('../services/encrypt');

const songGuessHandler =
  (io, socket, clients) =>
  ({ guess, currentlyPlaying }) => {
    const playingSongFile = encryptService.decrypt(currentlyPlaying);
    const correctSong = playingSongFile.split('.')[0];
    const guessingClient = clients[socket.id];

    if (guess.toUpperCase() === correctSong.toUpperCase()) {
      if (guessingClient.points === 3) {
        io.sockets.emit('game-end', { winner: guessingClient.name });
      } else {
        io.sockets.emit('correct_guess', { correctSong });
        guessingClient.points += 1;
      }
    } else {
      io.to(socket.id).emit('guess-again');
    }
  };

module.exports = { songGuessHandler };
