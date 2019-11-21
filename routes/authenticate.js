const express = require('express');
const router = express.Router();

const registerMiddleware = require('../middlewares/registerMiddleware')
const loginMiddleware = require('../middlewares/loginMiddleware')

router.post('/register', registerMiddleware);
router.post('/login', loginMiddleware);

module.exports = router