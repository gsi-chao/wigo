var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./municipality');
require('./place_type');
require('./thumbnail');
require('./contact');
require('./comment');
require('./galery');
require('./attachments');
var Municipality = mongoose.model('Municipality');
var PlaceType = mongoose.model('PlaceType');
var Comment = mongoose.model('Comment');
var Thumbnail = mongoose.model('Thumbnail');
var Contact = mongoose.model('Contact');
var Galery = mongoose.model('Galery');
var Attachment = mongoose.model('Attachment');

var placeSchema = new Schema({
    name: String,
    loc: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d',      // create the geospatial index
        required:true
    },
    municipality:{type: Schema.ObjectId, ref: "Municipality", required:true },
    visitas: {type:Number,required:true},
    evaluation: {type:Number,required:true},
    picture: {type:Schema.ObjectId,required:true,ref: "Attachment"},
    description: {type:String,required:true},
    contact:{type: Schema.ObjectId, ref: "Contact" },
    type: {type: Schema.ObjectId, ref: "PlaceType", required:true },
    comment: [{type: Schema.ObjectId, ref: "Comment" }],
    galery: [{type: Schema.ObjectId, ref: "Galery" }]
});

module.exports = mongoose.model('Place', placeSchema);
