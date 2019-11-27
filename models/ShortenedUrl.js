const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClickCounter = require('./ClickCounter');

const ShortenedUrlSchema = new Schema({
    uniqueId: {
        type: String,
        required: true,
    },

    originUrl: {
        type: String,
        required: true,
    },

    clickCounterId: {
        type: Schema.Types.ObjectId,
        ref: 'ClickCounter',
    },

    isPrivate: {
        type: Boolean,
        default: false 
    },

    ownerId: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'User'
    },

    createdDate: {
        type: Date,
        default: Date.now
    }
});


const ShortenedUrl = mongoose.model('ShortenedUrl', ShortenedUrlSchema)
module.exports = ShortenedUrl;