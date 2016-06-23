/**
 * 给所有的 Model 扩展功能
 */
var utils = require('../common/utility');

module.exports = function (schema) {
  schema.methods.createAt = function () {
    return utils.formatDate(this.createTime, true);
  };

  schema.methods.lastUpdateAt = function () {
    return utils.formatDate(this.lastUpdateTime, true);
  };
};
