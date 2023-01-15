const headerMiddleware = (req, response, next) => {
    //header
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.header("Access-Control-Expose-Headers: Content-Range")
    next();

}
module.exports = headerMiddleware;