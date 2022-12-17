const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server started - listening on port ${port}`);
});
