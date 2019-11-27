const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const idGenerator = require('../services/idGenerator');
const ShortenedUrl = require('../models/ShortenedUrl');
const ClickCounter = require('../models/ClickCounter');
const User = require('../models/User');


module.exports = async function shortenerUrlMiddleware(req, res) {
     // Request header contain jwt => url create by User, else, by guess
    let ownerId = null
    //req.token is assign in authorizeMiddleware
    if (req.token) {
        ownerId = jwt.verify(req.token, keys.JWT_SECRET)._id; //decode
    } 

    let {originUrl, uniqId} = req.body;
    if (uniqId === "") {
        do {
            uniqId = idGenerator();
            existUrl = await ShortenedUrl.findOne({uniqueId: uniqId});
        } while (existUrl)
            
    } else {
        // CHECK IF THIS CUSTOM ID ALREADY EXIST
        existUrl = await ShortenedUrl.findOne({uniqueId: uniqId});

        if(existUrl) {
            return res.status(409).json({
                error: 'This ID is already taken, please choose another one.'
            })
        }
    }

    try {
        const newUrl = await new ShortenedUrl({
            uniqueId: uniqId,
            originUrl: originUrl,
            ownerId: ownerId,
            isPrivate: (ownerId) ? true : false
        })
        const clickCounter = await new ClickCounter({urlId: newUrl._id});
        newUrl.clickCounterId = clickCounter._id;

        if (ownerId) {
            owner = await User.findById(ownerId);
            owner.shortenedUrls.push(newUrl._id);
            owner.save();
        }
        
        clickCounter.save();
        newUrl.save();

        const host = req.headers.host;
        const protocol = req.protocol;
        const returnedUrlItem =  {
            _id: newUrl._id,
            uniqueId: newUrl.uniqueId,
            originUrl: newUrl.originUrl,
            createdDate: newUrl.createdDate,
            shortedUrl: protocol + '://' + host + '/' + newUrl.uniqueId,
            totalClicks: clickCounter.totalClicks,
            requestTimeStamp: clickCounter.requestTimeStamp
        }


        res.status(200).json(returnedUrlItem)
      } catch (err) {
          console.log(err)
        res.status(500).json({err: err})
      }
}

