const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShortenedUrlSchema = new Schema({
    uniqueId: {
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

    isPrivate: {
        type: Boolean,
        default: false 
    },

    owner: {
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