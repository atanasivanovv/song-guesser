const encryptService = require('../services/encrypt');

let guesses = 0;

const songGuessHandler =
  (io, socket) =>
  ({ guess, currentlyPlaying }) => {
    const playingSongFile = encryptService.decrypt(currentlyPlaying);
    const correctSong = playingSongFile.split('.')[0];

    if (guess.toUpperCase() === correctSong.toUpperCase()) {
      if (guesses === 3) {
        io.sockets.emit('game-end', { winner: socket.id });
      } else {
        io.sockets.emit('correct_guess', { correctSong });
        guesses++;
      }
    } else {
      io.to(socket.id).emit('guess-again');
    }
  };

module.exports = { songGuessHandler };
