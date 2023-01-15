const rangeMiddleware = (req, res, next) => {
    const {range} = req.headers;
    if(range) {
        const [start, end] = range.replace(/bytes=/, '').split('-');
        req.range = {
            start: parseInt(start, 10),
            end: parseInt(end, 10)
        }
    }
    next();
}

module.exports = rangeMiddleware;