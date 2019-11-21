const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShortenedUrlSchema = new Schema({
    uniqueCode: {
        type: String,
        required: true,
    },

    originUrl: {
        type: String,
        required: true,
    },

    clickedCount: {
        type: Number,
        default: 0
    },

    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    createdDate: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('ShortenedUrl', ShortenedUrlSchema)
module.exports = ShortenedUrl;