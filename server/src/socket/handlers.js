const encryptService = require('../services/encrypt');

let guesses = 0;

const songGuessHandler =
  (io, socket) =>
  ({ guess, currentlyPlaying }) => {
    console.log('Received guess:', guess);

    const playingSongFile = encryptService.decrypt(currentlyPlaying);
    const correctSong = playingSongFile.split('.')[0];
    console.log(correctSong);

    if (guess === correctSong) {
      if (guesses === 3) {
        io.sockets.emit('game-end', { winner: socket.id });
      } else {
        io.sockets.emit('correct_guess', { correctSong });
        guesses++;
      }
    } else {
      io.sockets.emit('guess-again');
    }
  };

module.exports = { songGuessHandler };
