const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/', controllers.home);
router.get('/song-genres', controllers.genres);
router.get('/songs', controllers.tracks);

module.exports = router;
