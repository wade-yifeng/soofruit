var models = require('../models');
var Favorite = models.Favorite;

exports.getFavoritesByUserID = function(userID, callback) {
    Favorite.find({userID: userID}, function(err, favorites) {
            if (err) {
                return callback(err);
            }
            // if (favorites.length === 0) {
            //     return callback(null, []);
            // }

            favorites = _.map(favorites, function(item) {
                return item.itemID;
            });

            return callback(null, favorites);
        }
    );
};

exports.add = function(data, callback) {
    var favorite = new Favorite(data);

    favorite.save(function (err, result) {
        callback(err, result);
    });
};

exports.remove = function(userID, itemID, callback) {
    Favorite.remove({userID: userID, itemID: itemID}, function (err, result) {
        callback(err, result);
    });
};