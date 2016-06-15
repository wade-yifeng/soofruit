var config  = require('config');
var Subject = require('../models').Subject;

/**
 * 获取激活的主题
 * Callback:
 * - err, 数据库异常
 * - subject, 主题
 * @param {String} query 扩展查询条件
 * 后期考虑根据用户推荐不同的主题
 */
exports.getActiveSubject = function (query, opt, callback) {
    query = _.extend(query, {active: true});
    Subject.find(query, {}, opt || {limit: config.min_subject_size, sort: 'priority'},
        function(err, subjects) {
            if (err) {
                return callback(err);
            }
            if (subjects.length === 0) {
                return callback(null, []);
            }

            var items = _.map(subjects, function(item) {
                return {
                    id: item._id,
                    type: item.type,
                    name: item.name,
                    title: item.desc,
                    img: item.pics[0],
                    tags: item.tags,
                    url: item.url
                };
            });

            return callback(null, items);
        }
    );
};