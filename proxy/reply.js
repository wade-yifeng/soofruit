var config = require('config');
var Reply  = require('../models').Reply;
var logger = require('../common/logger');

/**
 * 根据微信昵称查找是否有需要回复的消息
 */
exports.getReplyByNickName = function (targetName, callback) {
    Reply.find({targetName: targetName, available: true}, 
        function(err, replies) {
            if (err) {
                return callback(err);
            }

            replies = _.map(replies, function(item) {
                return {
                    id: item._id,
                    msg: item.msg,
                    nickName: item.nickName
                };
            });

            return callback(null, replies);
        }
    );
};

exports.updateReply = function(reply, callback) {
    Reply.findOneAndUpdate({nickName: reply.nickName, targetName: reply.targetName, available: true},
        reply, {upsert: true, setDefaultsOnInsert: true}, callback);
};

exports.updateReplyResult = function (replyID, targetID, result, callback) {
    Reply.update({_id: replyID}, {$set:{targetID: targetID, result: result, available: false}}, callback);
};
