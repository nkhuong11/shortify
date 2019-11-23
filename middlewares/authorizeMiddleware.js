const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/User');

module.exports = function authorizeMiddleware(req, res, next) {
    const header_authorization = req.headers['authorization'];

    if(typeof header_authorization !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    }
}