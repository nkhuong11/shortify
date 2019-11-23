const ShortenedUrl = require('../models/ShortenedUrl');

module.exports = async function redirectMiddleware(req, res, next) {
    const {url, method} = req

    uniqId = url.substr(1);
    let shortenedUrl = await ShortenedUrl.findOne({uniqueId: uniqId}).lean()
    if (shortenedUrl && method === "GET") {
        res.redirect(shortenedUrl.originUrl)
    }
    next();
}