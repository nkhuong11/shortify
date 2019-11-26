const express = require('express');
const router = express.Router();

const shortenerUrlMiddleware = require('../middlewares/shortenerUrlMiddleware');
const {getPublicUlrsMiddleware, getPrivateUlrsMiddleware} = require('../middlewares/getDataMiddleware');

router.post('/shortener', shortenerUrlMiddleware); // CHECK THE JWT TOKEN IN REQUEST HEADER FIRST
router.get('/get/public-urls', getPublicUlrsMiddleware);
router.get('/get/private-urls', getPrivateUlrsMiddleware);
module.exports = router