require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(cors());

// parse JSON request body
app.set('json spaces', 2);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api routes
app.use('/', routes);

module.exports = app;
