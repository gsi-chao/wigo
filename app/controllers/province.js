var Province = require('../models/province');
var defaultController = require('../controllers/default');
exports.save = function (req, res) {
    var province = new Province(req.body);
    province.save(function (err) {
        if (!err) {
            res.json({success: true, data: 'Insert Province'});
            //res.json({success: true, data: thumb});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.update = function (req, res) {

    Province.findOneAndUpdate({_id:req.params.id},req.body,{upsert:true},function (err,province) {
        if (!err) {
            res.json({success: true, data: 'Update Contact'});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    });
}

exports.findAll = function (req,res) {
    defaultController.findAll(req,res,Province);
}

exports.findById = function (req,res) {
    Province.findById(req.params.id,function (error,province) {
        if(!error){
            res.json({success: true, data: province})
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.delete = function (req, res) {
    Province.findOneAndRemove({_id:req.params.id},function (error,province) {
        if(!error){
            res.json({success: true, data: 'The item has been deleted'});
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    })
}


