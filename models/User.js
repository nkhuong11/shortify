const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    createdDate: {
        type: Date,
        default: Date.now
    },

    avatar: {
        type: String,
        default: 'http://www.gravatar.com/avatar/75d23af433e0cea4c0e45a56dba18b30?s=400&r=pg&d=mm'
    },

    shortenedUrls: [{type: Schema.Types.ObjectId, ref: 'ShortenedUrl'}],
});

const User = mongoose.model('User', UserSchema)
module.exports = User;