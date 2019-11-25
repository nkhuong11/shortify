const ShortenedUrl = require('../models/ShortenedUrl');
const ClickCounter = require('../models/ClickCounter');

module.exports = async function redirectMiddleware(req, res, next) {
    const {url, method} = req

    uniqId = url.substr(1);
    const shortenedUrl = await ShortenedUrl.findOne({uniqueId: uniqId}).lean()
    if (shortenedUrl && method === "GET") {
        res.redirect(shortenedUrl.originUrl);
        const clickCounter = await ClickCounter.findById(shortenedUrl.clickCounterId);
        clickCounter.totalClicks += 1;
        clickCounter.requestTimeStamp.push(Date.now());
        clickCounter.save();
    }
    next();
}