const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');


module.exports = function registerMiddleware(req, res) {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if(user) {
            return res.status(409).json({
                email: 'Email already exists'
            })
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if(err) { 
                    console.error('There was an error when generating salt', err);
                } else {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if(err) console.error('There was an error when generating password', err);
                        else {
                            const newUser = new User({
                                username: req.body.username,
                                email: req.body.email,
                                password: hash
                            })
                           
                            newUser.save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    }) 
}