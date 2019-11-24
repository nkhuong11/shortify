const ShortenedUrl = require('../models/ShortenedUrl');

async function getUlrsMiddleware(req, res) {
    try {
        const urls = await ShortenedUrl.find({ isPrivate: false});
        const host = req.headers.host;
        const protocol = req.protocol
        
        if(urls) {
            const payload = urls.map((url) => {
                return {
                    _id: url._id,
                    uniqueId: url.uniqueId,
                    originUrl: url.originUrl,
                    clickedCount: url.clickedCount,
                    createdDate: url.createdDate,
                    shortedUrl: protocol + '://' + host + '/' + url.uniqueId,
                }
            })
            console.log(payload);
            res.status(200).json({urls: payload});
        }

        // 
        // if (urls) {
        //     // console.log(urls)
        //     const returnedUrls = urls.map(url => ({
        //         ...url,
        //         shortedUrl: domain + url.uniqueId
        //     }));

        //     console.log(returnedUrls);

        //     res.status(200).json({urls: returnedUrls});
        // }
    } catch(err){
        console.log(err)
        res.status(500).json({err: err})
    }
}

module.exports = {
    getUlrsMiddleware
}