const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/User');

module.exports = function loginMiddleware(req, res) {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(!user) {
                return res.status(404).json({email: 'User not found'});
            } else {
                bcrypt.compare(req.body.password, user.password)
                        .then(isMatch => {
                            if(isMatch) {
                                const payload = {
                                    _id: user.id,
                                    username: user.username,
                                    email: user.email,
                                    avatar: user.avatar,
                                    shortenedUrls: user.shortenedUrls,
                                    createdDate: user.createdDate
                                }

                                jwt.sign(payload, keys.JWT_SECRET, {
                                    expiresIn: '7d'
                                }, (err, token) => {
                                    if(err) console.error('There is some error in token', err);
                                    else {
                                        res.json({
                                            success: true,
                                            token: `Bearer ${token}`
                                        });
                                    }
                                });
                            }
                            else {
                                errors.password = 'Incorrect Password';
                                return res.status(400).json(errors);
                            }
                        });
                    }
        });
}