var User = require('../../../shared/models').User;

module.exports.list = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            req.json({code:500, message: err});
        } 
        
        res.json(users);
    });
};