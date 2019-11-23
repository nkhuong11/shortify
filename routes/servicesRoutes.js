const express = require('express');
const router = express.Router();

const shortenerUrlMiddleware = require('../middlewares/shortenerUrlMiddleware');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');

router.post('/shortener', shortenerUrlMiddleware); // CHECK THE JWT TOKEN IN REQUEST HEADER FIRST

module.exports = router