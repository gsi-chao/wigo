var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;





var thumSchema = new Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    url_pic: {type:String,required:true}
});

module.exports = mongoose.model('Thumbnail', thumSchema);
