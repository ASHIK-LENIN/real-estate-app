const errorHandler = require('./error')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return next(errorHandler(403, 'Token not found'));

        req.user = user;

        next();
    }
    )
};


module.exports = verifyToken;