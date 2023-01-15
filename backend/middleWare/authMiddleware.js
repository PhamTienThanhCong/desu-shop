const jst = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(' ')[1];
            jst.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: 'Invalid token' });
                }
                req.user = user;
                next();
            })
        }
        else {
            return res.status(401).json({ message: 'You are not authenticated' });
        }
    },
    verifyAdmin: (req, res, next) => {
        authMiddleware.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.admin) {
                next();
            }
            else {
                return res.status(403).json({ message: 'You are not allowed to do that' });
            }
        }
        )
    }
}

module.exports = authMiddleware;