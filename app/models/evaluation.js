var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./place');
var Place = mongoose.model('Place');

var evalSchema = new Schema({
    eval: {type:Number,min:1, max:5},
    ip: String,
    date:{type: Date, default: Date.now },
    place: {type: Schema.ObjectId, ref: "Place" }
});

module.exports = mongoose.model('Evaluation', evalSchema);
