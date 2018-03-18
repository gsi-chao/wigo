var Evaluation = require('../models/evaluation');
var defaultController = require('../controllers/default');
exports.save = function (req, res) {
    var evaluation = new Evaluation(req.body);
    evaluation.save(function (err) {
        if (!err) {
            res.json({success: true, data: 'Insert Evaluation'});
            //res.json({success: true, data: thumb});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.update = function (req, res) {

    Evaluation.findOneAndUpdate({_id:req.params.id},req.body,{upsert:true},function (err,evaluation) {
        if (!err) {
            res.json({success: true, data: 'Update Evaluation'});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    });
}

exports.findAll = function (req,res) {
    defaultController.findAll(req,res,Contact,['place']);
}

exports.findById = function (req,res) {
    Evaluation.findById(req.params.id,function (error,evaluation) {
        if(!error){
            res.json({success: true, data: evaluation})
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    }).populate('place');
}

exports.delete = function (req, res) {
    Evaluation.findOneAndRemove({_id:req.params.id},function (error,eval) {
        if(!error){
            res.json({success: true, data: 'The item has been deleted'});
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    })
}


