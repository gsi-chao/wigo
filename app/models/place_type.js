var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');


var typeSchema = new Schema({
    name: String,
    description: String,
    icon: String,
    url: String
});


module.exports = mongoose.model('PlaceType', typeSchema);
