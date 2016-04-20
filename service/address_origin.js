var models = require('../models');
var Province = models.Province;
var City = models.City;
var District = models.District;
var AddressLevel = require('../models/enums').AddressLevel;


module.exports.list = function (req, res) {
    var addrLv = req.params.addrLv;
    var id = parseInt(req.params.id);

    switch (addrLv) {
        case AddressLevel.Province:
            Province.find({},
                {_id: 0, PID: 1, Val: 1, Seq: 1}
            ).lean().exec(function (err, doc) {
                if (err) {
                    res.json({code: 500, msg: err});
                }
                else {
                    res.json({code: 0, data: doc});
                }
            });
            break;
        case AddressLevel.City:
            City.find({PID: id},
                {_id: 0, CID: 1, Val: 1, Seq: 1}
            ).lean().exec(function (err, doc) {
                if (err) {
                    res.json({code: 500, msg: err});
                }
                else {
                    res.json({code: 0, data: doc});
                }
            });
            break;
        case AddressLevel.District:
            District.find({CID: id},
                {_id: 0, Val: 1}
            ).lean().exec(function (err, doc) {
                if (err) {
                    res.json({code: 500, msg: err});
                }
                else {
                    res.json({code: 0, data: doc});
                }
            });
            break;
    }
};