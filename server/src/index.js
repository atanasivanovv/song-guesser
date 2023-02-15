const app = require('./app');
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const setupSocketConnections = require('./socket');
const port = process.env.PORT || 3000;

server.listen(port, async () => {
  console.log(`Server started - listening on port ${port}`);
});

setupSocketConnections(io);
