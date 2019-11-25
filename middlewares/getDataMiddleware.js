const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const ShortenedUrl = require('../models/ShortenedUrl');


async function getUlrsMiddleware(req, res) {
    try {
        const host = req.headers.host;
        const protocol = req.protocol;
        const recentUrls = await ShortenedUrl.find({ isPrivate: false});
        let privateUrls;
        if (req.token) {
            //get private urls of user
            const ownerId = jwt.verify(req.token, keys.JWT_SECRET)._id; //decode
            privateUrls = await ShortenedUrl.find({ ownerId: ownerId});
        }
        
        if(recentUrls) {
            let privateUrlsResult = [];
            let recentUrlsResult = recentUrls.map((url) => {
                return {
                    _id: url._id,
                    uniqueId: url.uniqueId,
                    originUrl: url.originUrl,
                    clickCounterId: url.clickCounterId,
                    createdDate: url.createdDate,
                    shortedUrl: protocol + '://' + host + '/' + url.uniqueId,
                }
            })
            if (privateUrls) {
                privateUrlsResult = privateUrls.map((url) => {
                    return {
                        _id: url._id,
                        uniqueId: url.uniqueId,
                        originUrl: url.originUrl,
                        clickCounterId: url.clickCounterId,
                        createdDate: url.createdDate,
                        shortedUrl: protocol + '://' + host + '/' + url.uniqueId,
                    }
                })
            }
            

            res.status(200).json({
                recentUrls: recentUrlsResult,
                privateUrls: privateUrlsResult
            });
        }
    } catch(err){
        console.log(err)
        res.status(500).json({err: err})
    }
}

module.exports = {
    getUlrsMiddleware
}