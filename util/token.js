var jwt = require('jsonwebtoken');
var config = require('config');

var getToken = function (headers) {
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');
        
        if (part.length === 2) {
            return part[1];
        } 
    } 
    return null;
};

var response = function (res, code, message) {
    res.statusCode = code;
    res.end(message);
};

module.exports.expireToken = function (headers) {
    var token = getToken(headers);
    
    // if (token) {
    //     redisClient.set(token, { expired: true });
    //     redisClient.end();
    // }
};

module.exports.verifyToken = function (req, res, next) {
    var token = getToken(req.headers);
    
    if (!token) {
        response(res, 401, 'Request requires token sending with headers.');
    }
        
    jwt.verify(token, config.SECRET_TOKEN, function (err, decoded) {
        if (err) {
            console.log(err);
            response(res, 401, err);
        }
        
        if (req.session.token) {
            if (decoded === req.session.token.key) {
                next();
            } else {
                response(res, 401, 'Invalid token.');
            }
        } else {
            response(res, 401, 'Please sign in first.');
        }            
    });
};