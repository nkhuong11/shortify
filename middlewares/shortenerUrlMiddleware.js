const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const idGenerator = require('../services/idGenerator');
const ShortenedUrl = require('../models/ShortenedUrl');


module.exports = async function shortenerUrlMiddleware(req, res) {
     // Request header contain jwt => url create by User, else, by guess
    let owner_id = null
    if (req.headers['authorization']) {
        jwtToken = req.headers['authorization'].split(' ')[1];
        owner_id = jwt.verify(jwtToken, keys.JWT_SECRET)._id; //decode
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
                success: false,
                error: 'This ID is already taken, please choose another one.'
            })
        }
    }

    const newUrl = new ShortenedUrl({
        uniqueId: uniqId,
        originUrl: originUrl,
        owner: owner_id,
        isPrivate: (owner_id) ? true : false
    })

    newUrl.save()
        .then(url => {
            res.status(200).json(url)
        }); 
}

