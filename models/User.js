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
        default: 'https://www.gravatar.com/avatar/d1a4927d65d5228d8f3c5d11cc040afe?s=200&d=identicon'
    },

    shortenedUrls: [{type: Schema.Types.ObjectId, ref: 'ShortenedUrl'}],
});

const User = mongoose.model('User', UserSchema)
module.exports = User;