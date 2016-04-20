var mongoose = require('mongoose');

/**
 * 省
 */
var ProvinceSchema = new mongoose.Schema({
    PID: Number,
    Val: String,
    Seq: Number
});

/**
 * 市
 */
var CitySchema = new mongoose.Schema({
    CID: Number,
    Val: String,
    PID: Number,
    Seq: Number
});

/**
 * 区
 */
var DistrictSchema = new mongoose.Schema({
    ID: Number,
    Val: String,
    CID: Number
});

mongoose.model('Province', ProvinceSchema);
mongoose.model('City', CitySchema);
mongoose.model('District', DistrictSchema);