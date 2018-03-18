var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var contactSchema = new Schema({
    address: String,
    phone: String,
    movil: String
});

module.exports = mongoose.model('Contact', contactSchema);
