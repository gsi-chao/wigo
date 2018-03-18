var Thumbnail = require('../models/thumbnail');
var defaultController = require('../controllers/default');
exports.save = function (req, res) {
    var thumb = new Thumbnail(req.body);

    thumb.save(function (err) {
        if (!err) {
            res.json({success: true, data: 'Insert Thumbnail'});
            //res.json({success: true, data: thumb});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.update = function (req, res) {
    Thumbnail.findOneAndUpdate({_id:req.params.id},req.body,{upsert:true},function (err,thumbnail) {
        if (!err) {
            res.json({success: true, data: 'Update Thumbnail'});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    });
}

exports.findAll = function (req,res) {
    defaultController.findAll(req,res,Thumbnail);
}

exports.findById = function (req,res) {
    Thumbnail.findById(req.params.id,function (error,thumbnail) {
        if(!error){
            res.json({success: true, data: thumbnail})
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.delete = function (req, res) {
    Thumbnail.findOneAndRemove({_id:req.params.id},function (error,thumbnail) {
        if(!error){
            res.json({success: true, data: 'The item has been deleted'});
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    })
}


