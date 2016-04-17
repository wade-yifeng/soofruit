/**
 * RedisSessionStore测试
 */

module.exports.getSession = function (req, res) {
    if (req.session) {
        var key = req.params.key;
        if (req.session[key]) {
            res.json(req.session[key]);
            return;
        }
    }
    res.json({result: 'no session'});
};

module.exports.setSession = function (req, res) {
    if (req.session && req.body) {
        var data = req.body;
        req.session[data.key] = data.value;
        res.json(req.session);
        return;
    }
    res.json({result: 'no session'});
};