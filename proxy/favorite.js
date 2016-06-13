var Favorite = require('../models/favorite');

exports.getFavoritesByUserID = function(userID, callback) {
    Favorite.find({userID: userID}, function(err, favorites) {
            if (err) {
                return callback(err);
            }
            
            favorites = _.map(favorites, function(item) {
                return item.itemID;
            });

            return callback(null, favorites);
        }
    );
};

exports.add = function(data, callback) {
    var favorite = new Favorite(data);

    favorite.save(callback);
};

exports.remove = function(userID, itemID, callback) {
    Favorite.remove({userID: userID, itemID: itemID}, callback);
};