const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClickCounterSchema = new Schema({
    urlId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'ShortenedUrl'
    },

    totalClicks: {
        type: Number,
        default: 0
    },

    //Time
    requestTimeStamp: [{type: Date, default: Date.now}]

});

const ClickCounter = mongoose.model('ClickCounter', ClickCounterSchema)
module.exports = ClickCounter;