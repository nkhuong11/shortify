const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const ShortenedUrl = require('../models/ShortenedUrl');
const ClickCounter = require('../models/ClickCounter');
const User = require('../models/User');


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
        } else {
            res.status(401).json({error: 'Unauthorized'});
        }
    } catch(err){
        res.status(500).json({err: err})
    }
}

async function deleteUlrMiddleware(req, res, next) {
    try {
        if (req.token) {
            const ownerId = jwt.verify(req.token, keys.JWT_SECRET)._id; //
            const {url_id} = req.body;
            const deletedUrl = await ShortenedUrl.findOneAndDelete({ _id: url_id, ownerId: ownerId});
            if(deletedUrl) {
                await ClickCounter.findOneAndDelete({_id: deletedUrl.clickCounterId});
                await User.findOneAndUpdate({_id: deletedUrl.ownerId}, {$pull: {shortenedUrls: deletedUrl._id}});
                res.status(200).json({message: "URL deleted successfully"});
            }
        }
        next();
    } catch(err){
        res.status(500).json({err: err})
    }
}

module.exports = {
    getPublicUlrsMiddleware,
    getPrivateUlrsMiddleware,
    deleteUlrMiddleware
}

