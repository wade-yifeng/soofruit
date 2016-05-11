var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redisClient = require('./redis_client').redisClient;
var config = require('config');

module.exports.initSessionStore = function (app) {
    app.use(session({
        store: new RedisStore({
            host: 'localhost',
            port: 6379,
            client: redisClient
        }),
        secret: config.session_secret,
        resave: false,
        saveUninitialized: false
    }));
};