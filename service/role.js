var RoleCategory = require('../models/enums').RoleCategory;

module.exports.getRoleCategories = function (req, res) {
    res.send(RoleCategory);
};