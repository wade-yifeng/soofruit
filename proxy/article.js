var config = require('config');

var models = require('../models');
var Article = models.Article;

/**
 * 根据推广二维码ID查找文章
 * Callback:
 * - err, 数据库异常
 * - article, 文章
 */
exports.getArticleByQRCodeID = function (qrCodeID, callback) {
    Article.findOne({qrCodeID: qrCodeID}, 
        function(err, article) {
            if (err) {
                return callback(err);
            }

            return callback(null, article);
        }
    );
};

/**
 * 根据推广二维码ID来记录关注人数增长
 * Callback:
 * - err, 数据库异常
 * - records, 推荐关注人数
 * @param {Number} qrCodeID 推广二维码编号
 */
function increaseArticleRecords(qrCodeID, callback) {
    Article.findAndModify({qrCodeID: qrCodeID}, {$inc: {records: 1}}, {new: true}, callback);
}

exports.createArticleWithQRCode = function (qrCodeID, qrCodeURL, callback) {
    this.save(new Article({
        qrCodeID: qrCodeID,
        qrCodeURL: qrCodeURL
    }), callback);
};

exports.save = function(data, callback) {
    var article = new Article(data);

    article.save(function (err, result) {
        callback(err, result);
    });
};