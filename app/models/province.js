var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var provinceSchema = new Schema({
    name:  {type:String,required:true},
    code: {type:String,required:true},
});

module.exports = mongoose.model('Province', provinceSchema);
