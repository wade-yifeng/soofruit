

var RoleCategory = require('../../../shared/enums').RoleCategory;

module.exports.getRoleCategories = function (req, res) {
    res.send(RoleCategory);
};