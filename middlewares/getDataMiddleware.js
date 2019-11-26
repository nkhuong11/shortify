const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const ShortenedUrl = require('../models/ShortenedUrl');


async function getPublicUlrsMiddleware(req, res) {
    try {
        const host = req.headers.host;
        const protocol = req.protocol;
        const recentUrls = await ShortenedUrl.find({ isPrivate: false})
                                            .sort({createdDate: 'desc'})
                                            .populate({ path: 'clickCounterId', model: 'ClickCounter', select: 'totalClicks requestTimeStamp' })           
        if(recentUrls) {
            let recentUrlsResult = recentUrls.map((url) => {
                return {
                    _id: url._id,
                    uniqueId: url.uniqueId,
                    originUrl: url.originUrl,
                    createdDate: url.createdDate,
                    shortedUrl: protocol + '://' + host + '/' + url.uniqueId,
                    totalClicks: url.clickCounterId.totalClicks,
                    requestTimeStamp: url.clickCounterId.requestTimeStamp
                }
            })

            res.status(200).json(recentUrlsResult);
        }
    } catch(err){
        console.log(err)
        res.status(500).json({err: err})
    }
}



async function getPrivateUlrsMiddleware(req, res) {
    try {
        const host = req.headers.host;
        const protocol = req.protocol;

        if (req.token) {
            //get private urls of user
            const ownerId = jwt.verify(req.token, keys.JWT_SECRET)._id; //decode
            const privateUrls = await ShortenedUrl.find({ ownerId: ownerId})
                                                .sort({createdDate: 'desc'})
                                                .populate({ path: 'clickCounterId', model: 'ClickCounter', select: 'totalClicks requestTimeStamp' });
        
            if (privateUrls) {
                const privateUrlsResult = privateUrls.map((url) => {
                    return {
                        _id: url._id,
                        uniqueId: url.uniqueId,
                        originUrl: url.originUrl,
                        createdDate: url.createdDate,
                        shortedUrl: protocol + '://' + host + '/' + url.uniqueId,
                        totalClicks: url.clickCounterId.totalClicks,
                        requestTimeStamp: url.clickCounterId.requestTimeStamp
                    }
                })
                res.status(200).json(privateUrlsResult);
            }
        }
    } catch(err){
        console.log(err)
        res.status(500).json({err: err})
    }
}

module.exports = {
    getPublicUlrsMiddleware,
    getPrivateUlrsMiddleware
}