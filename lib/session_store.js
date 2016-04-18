var session = require('express-session');
var redisStore = require('connect-redis')(session);
var redisClient = require('./redis_db').redisClient;
var config = require('config');

module.exports.initSessionStore = function (app) {
    app.use(session({
        store: new redisStore({
            host: 'localhost',
            port: 6379,
            client: redisClient
        }),
        secret: config.session_secret,
        resave: false,
        saveUninitialized: false
    }));
}