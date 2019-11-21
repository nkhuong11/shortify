const express = require('express');
const router = express.Router();

const shortenerUrlMiddleware = require('../middlewares/shortenerUrlMiddleware')

router.post('/shortener', shortenerUrlMiddleware);

module.exports = router