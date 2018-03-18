var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var galerySchema = new Schema({
    unic_name: String,
    url_pic: String
});

module.exports = mongoose.model('Galery', galerySchema);
