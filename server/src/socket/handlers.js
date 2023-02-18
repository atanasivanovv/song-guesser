const songGuessHandler = (io, socket) => (guess) => {
  console.log('Received guess:', guess);
  io.sockets.emit('correct_guess');
  if (guess === 'test_song') {
    io.sockets.emit('game_end', { winner: socket.id });
  }
};

module.exports = { songGuessHandler };
