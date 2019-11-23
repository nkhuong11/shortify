const express = require('express');
const router = express.Router();

const shortenerUrlMiddleware = require('../middlewares/shortenerUrlMiddleware');

router.post('/shortener', shortenerUrlMiddleware); // CHECK THE JWT TOKEN IN REQUEST HEADER FIRST
module.exports = router