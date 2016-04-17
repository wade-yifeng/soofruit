var redis = require('redis');
var redisClient = redis.createClient(6379);

redisClient.on('error', function (error) {
    console.log('Redis error : ' + error);
});

redisClient.on('connect', function () {
    console.log('Redis is ready to go.');
});

module.exports.redis = redis;
module.exports.redisClient = redisClient;