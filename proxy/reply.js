var config = require('config');
var mongoose  = require('mongoose');
var models = require('../models');
var Reply = models.Reply;
var ReplyModel = mongoose.model('Reply');
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
    var replyModel = new ReplyModel(reply);

    Reply.findOneAndUpdate({nickName: replyModel.nickName, targetName: replyModel.targetName, available: true}, 
        replyModel, {upsert: true, setDefaultsOnInsert: true}, callback);
};

exports.updateReplyResult = function (replyID, targetID, result, callback) {
    Reply.update({_id: relpyID}, {$set:{targetID: targetID, result: result, available: false}}, callback);
};
