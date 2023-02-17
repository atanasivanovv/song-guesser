const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/', controllers.home);
router.get('/songs', controllers.tracks);
router.get('/song', controllers.song);

module.exports = router;
