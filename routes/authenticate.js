const express = require('express');
const router = express.Router();

const registerMiddleware = require('../middlewares/registerMiddleware');
const loginMiddleware = require('../middlewares/loginMiddleware');
const logoutMiddleware = require('../middlewares/logoutMiddleware');

router.post('/register', registerMiddleware);
router.post('/login', loginMiddleware);
router.post('/logout', logoutMiddleware);//REMOVE THE HTTPONLY IN COOKIE FROM SERVER SIZE

module.exports = router