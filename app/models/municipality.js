var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./province');
var Province = mongoose.model('Province');

var munSchema = new Schema({
    name: String,
    code: String,
    province: {type: Schema.ObjectId, ref: "Province" }
});

module.exports = mongoose.model('Municipality', munSchema);
