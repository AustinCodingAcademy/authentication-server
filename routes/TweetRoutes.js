const express = require('express');
const {retrieve} = require('../controllers/TweetController');
const router = express.Router();

router.get('/api/tweets', retrieve);

module.exports = router;
