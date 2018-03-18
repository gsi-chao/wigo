var Municipality = require('../models/municipality');
var defaultController = require('../controllers/default');
exports.save = function (req, res) {
    var mun = new Municipality(req.body);
    mun.save(function (err) {
        if (!err) {
            res.json({success: true, data: 'Insert Municipality'});
            //res.json({success: true, data: thumb});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.update = function (req, res) {

    Municipality.findOneAndUpdate({_id:req.params.id},req.body,{upsert:true},function (err,mun) {
        if (!err) {
            res.json({success: true, data: 'Update Municipality'});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    });
}

exports.findAll = function (req,res) {
    defaultController.findAll(req,res,Municipality,['province']);
}

exports.findById = function (req,res) {
    Municipality.findById(req.params.id,function (error,mun) {
        if(!error){
            res.json({success: true, data: mun})
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    }).populate('province')
}

exports.delete = function (req, res) {
    Municipality.findOneAndRemove({_id:req.params.id},function (error,mun) {
        if(!error){
            res.json({success: true, data: 'The item has been deleted'});
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    })
}


