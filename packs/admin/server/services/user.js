var jwt = require('jsonwebtoken');
var tokenManager = require('../../../../util/token');
//var redisClient = require('../../../../util/redisdb').redisClient;
var config = require('config');
var User = require('../../../shared/models').User;
var UserPermission = require('../../../shared/models').UserPermission;
var Permission = require('../../../shared/models').Permission;

module.exports.list = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            req.json({code:500, message: err});
        } 
        
        res.json(users);
    });
};

module.exports.signin = function (req, res) {
    // sign in from wechat.
    var unifyuserid = req.body.unifyuserid || '';
    // sign in from website.
    var username = req.body.username || '';
    var password = req.body.password || '';
    
    // validate either way to signin.
    if (unifyuserid === '' && (username === '' || password === '')) {
        res.statusCode = 401;
        res.json({ msg: 'unify-userid or username and password are required.' });
        return;
    }
    
    // token exists in session.
    if (req.session.token) {
        res.json({ token: req.session.token.value });
        return;
    }
    
    // find user in db.
    User.findOne({$or: [{ unifyuserid: unifyuserid }, { username: username }] }, function (err, user) {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.json({ msg: err });
            return;
        }
        
        if(user) {
            // check if user is on black list.
            if (user.isBlocked) {
                res.statusCode = 401;
                res.json({ msg: 'Blocked user.' });
                return;
            }
            
            // password is not empty means sign in from website.
            if (password !='') {
                // sync method to compare.
                user.comparePasswordSync(password, function (isMatch) {
                    if (!isMatch) {
                        res.statusCode = 401,
                        res.json({ msg: 'username or password is incorrect.' });
                        return;
                    }
                });
            }
            
            // ???: is it nescessary to set expire time for jwt token?
            req.session.token = {
                key: user._id,
                value: jwt.sign({ id: user._id.toString() }, config.SECRET_TOKEN, { expiresIn : config.TOKEN_EXPIRATION_SEC })
            }
            
            // TODO: get user permission
            // TODO: save user permission in Redis.       
            res.json({ token: req.session.token.value });
            
        } else {
            // for wechat user, create account automatically.
            if (unifyuserid != '') {
                var user = new User();
                user.unifyuserid = unifyuserid;
                
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.statusCode = 500;
                        res.json({ msg: 'Auto create account error: ', err });
                        return;
                    }
                    // ???: is it nescessary to set expire time for jwt token?
                    req.session.token = {
                        key: user._id,
                        value: jwt.sign({ id: user._id.toString() }, config.SECRET_TOKEN, { expiresIn : config.TOKEN_EXPIRATION_SEC })
                    }
                    
                    // TODO: create user default permission.
                    // TODO: save user permission in Redis.                    
                    res.json({ token: req.session.token.value });
                });
            } else {
                // for website user, no auto create
                res.statusCode = 401;
                res.json({ msg: 'Please register first.' });
            }
        }
    });
};

module.exports.signout = function (req, res) {
    if (req.session.token) {
        req.session.destroy(function () {
            res.send(200);
        });
    } else {
        res.send(500);
    }
}

module.exports.register = function (req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';
    var passwordConfirmation = req.body.passwordConfirmation || '';
    
    if  (username == '' || password == '' || password != passwordConfirmation) {
        return res.send(400);
    }
    
    var user = new db.userModel();
    user.username = username;
    user.password = password;
    
    // TODO: create user default permission.
    
    // TODO: need more validation before save.
    user.save(function (err) {
        if (err) {
            console.log(err);
            return res.send(500);
        }        
        res.send(200);
    });
};

module.exports.userDetail = function (req, res) {
    User.findById(req.params._id).lean()
        .exec(function (err, user) {
            if (err) {
                res.json({code: 500, message: err});
            }
            else {
                res.json(user);
            }
        });
};

module.exports.createUser = function (req, res) {
    var user = new User(req.body);

    user.save(function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            Permission.findOne({'permissionType': req.body.role}, function(err, doc){

                var userPermission = new UserPermission({userId: user._id, permissionId: doc._id});

                userPermission.save(function(err){
                    if(err) {
                        res.json({code: 500, message: err});
                    }
                    else{
                        res.json(user._id.toString());
                    }
                });
            });
        }
    });
};

module.exports.editUser = function (req, res) {
    //Not implemented.
    res.send('edit ' + req.body._id);
};

module.exports.deleteUser = function (req, res) {
    //TODO: set isDeleted to true
    User.remove({_id: req.params._id}, function (err) {
        if (err) {
            res.json({code: 500, message: err});
        }
        else {
            res.json({code: 0});
        }
    });
};