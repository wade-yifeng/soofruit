/**
 * Created by xz_liu on 2016/3/8.
 */
var moment = require('moment');

moment.locale('zh-cn');

exports.formatDate = function (date, friendly) {
    if (friendly) {
        return date.fromNow();
    }
    else {
        return date.format('YYYY-MM-DD HH:mm');
    }
};