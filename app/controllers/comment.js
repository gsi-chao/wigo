var Comment = require('../models/comment');
var defaultController = require('../controllers/default');
var mongooseErrorHandler = require('mongoose-error-handler');

exports.save = function (req, res) {
    var comment = new Comment(req.body);
    comment.save(function (err) {
        if (!err) {
            res.json({success: true, data: 'Insert Comment'});
            //res.json({success: true, data: thumb});
        }
        else {
            res.status(401).send({success: false, message: mongooseErrorHandler.set(err)});
        }
    })
}

exports.update = function (req, res) {

    Comment.findOneAndUpdate({_id:req.params.id},req.body,{upsert:true},function (err,comment) {
        if (!err) {
            res.json({success: true, data: 'Update Comment'});
        }
        else {
            res.status(401).send({success: false, message: mongooseErrorHandler.set(err)});
        }
    });
}

exports.findAll = function (req,res) {
    defaultController.findAll(req,res,Comment);
}

exports.findById = function (req,res) {
    Comment.findById(req.params.id,function (error,comment) {
        if(!error){
            res.json({success: true, data: comment})
        }
        else{
            res.status(401).send({success: false, message: mongooseErrorHandler.set(err)});
        }
    }).populate('place')
}

exports.delete = function (req, res) {
    Comment.findOneAndRemove({_id:req.params.id},function (error,item) {
        if(!error){
            res.json({success: true, data: 'The item has been deleted'});
        }
        else{
            res.status(401).send({success: false, message: mongooseErrorHandler.set(err)});
        }
    })
}


