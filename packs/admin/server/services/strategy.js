var Strategy = require('../../../shared/models').Strategy;
var Enums = require('../../../shared/enums');

module.exports.list = function (req, res) {
    Strategy.find(function (err, strategies) {
        if (err) {
            res.json({code: 500, message: err});
        }
        
        res.json(strategies);
    });
};

module.exports.detail = function (req, res) {
    Strategy.findOne({_id: req.params.id}, function (err, strategy) {
        if (err) {
            res.json({code: 500, message: err});
        }
        
        res.json(strategy);
    });
};

module.exports.save = function (req, res) {
    var strategy = new Strategy();
    
    strategy.save(function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        
        res.json({id:strategy._id, meesage: 'strategy added'});
    });
};

module.exports.update = function (req, res) {
    Strategy.findOne({_id: req.params.id}, function (err, strategy) {
        if (err) {
            res.json({code:500, meesage: err});
        }
        
        for (prop in req.body) {
            if (prop != '_id') {
                strategy[prop] = req.body[prop];
            }
        }
        
        strategy.save(function (err) {
            if (err) {
                res.json({code: 500, meesage: err});
            }
            
            res.json({id: strategy._id, meesage: 'strategy updated'});
        });
    });
};

module.exports.delete = function (req, res) {
    Strategy.remove({_id: req.params.id}, function (err, strategy) {
        if (err) {
            res.json({code: 500, message: err});
        }
        
        res.json({id: req.params.id, message: 'strategy deleted'});
    });
};

module.exports.getEnums = function (req, res) {
    // TODO: consider to add enums into redis.
    // redisClient.set('Enums', Enums);
    res.send(Enums);
};