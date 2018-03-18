var mongoose = require('mongoose');
var gridfs = require('mongoose-gridfs')({
    collection:'attachments',
    model:'Attachment'
});
var AttachmentSchema = gridfs.schema;

//attach plugins
//ensure indexes

//register and export a model
module.export = mongoose.model('Attachment', AttachmentSchema);
