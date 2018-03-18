var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

var roleSchema = new Schema({
    name: { type:String, enum:['ROLE_ADMIN','ROLE_USER','ROLE_PREMIUM'],required:true},
    description: String,
});

module.exports = mongoose.model('Role', roleSchema);
