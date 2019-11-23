const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/User');


module.exports = async function loginMiddleware(req, res) {
    user = await User.findOne({email: req.body.email})

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
                        expiresIn: 604800 // 7days
                    }, (err, token) => {
                        if(err) console.error('There is some error in token', err);
                        else {
                            res.cookie('jwt',token, { maxAge: 604800000, httpOnly: true}); //Set jwt in cookie
                            res.status(200).json({
                                token: `Bearer ${token}`
                            });
                        }
                    });
                }
                else {
                    errors.password = 'Authentication failed. Wrong password';
                    return res.status(401).json(errors);
                }
            });
        }
}