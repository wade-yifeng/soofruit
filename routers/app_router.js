var express = require('express');
var site = require('../controllers/site');
var sign = require('../controllers/sign');

var router = express.Router();

// home page
router.get('/index', site.index);

// favorite
// router.post('/favorite', site.addFavorite);
// router.delete('/favorite/:itemID', site.removeFavorite);

router.get('/login', sign.login);

module.exports = router;