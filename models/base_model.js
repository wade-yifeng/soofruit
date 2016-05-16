/**
 * 给所有的 Model 扩展功能
 */
var tools = require('../common/utility');

module.exports = function (schema) {
  schema.methods.createAt = function () {
    return tools.formatDate(this.createTime, true);
  };

  schema.methods.lastUpdateAt = function () {
    return tools.formatDate(this.lastUpdateTime, true);
  };
};
