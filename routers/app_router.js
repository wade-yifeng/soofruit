var express = require('express');
var site = require('./controllers/site');

var router = express.Router();

// home page
router.get('/', site.index);

module.exports = router;