const express = require('express');
const router = express.Router();

const shortenerUrlMiddleware = require('../middlewares/shortenerUrlMiddleware');
const {getUlrsMiddleware} = require('../middlewares/getDataMiddleware');

router.post('/shortener', shortenerUrlMiddleware); // CHECK THE JWT TOKEN IN REQUEST HEADER FIRST
router.get('/get/urls', getUlrsMiddleware)
module.exports = router