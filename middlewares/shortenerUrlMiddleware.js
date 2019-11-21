const idGenerator = require('../services/idGenerator');

const ShortenedUrl = require('../models/ShortenedUrl');


module.exports = async function loginMiddleware(req, res) {

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

    return res.status(200).json({
        success: true,
        shortedUrl: 'ABC/' + uniqId 
    })
}