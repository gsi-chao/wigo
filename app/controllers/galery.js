var Galery = require('../models/galery');
var defaultController = require('../controllers/default');
exports.save = function (req, res) {
    var galery = new Galery(req.body);
    galery.save(function (err) {
        if (!err) {
            res.json({success: true, data: 'Insert Galery'});
            //res.json({success: true, data: thumb});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.update = function (req, res) {

    Galery.findOneAndUpdate({_id:req.params.id},req.body,{upsert:true},function (err,galery) {
        if (!err) {
            res.json({success: true, data: 'Update Galery'});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    });
}

exports.findAll = function (req,res) {
    defaultController.findAll(req,res,Galery,['place']);
}

exports.findById = function (req,res) {
    Galery.findById(req.params.id,function (error,galery) {
        if(!error){
            res.json({success: true, data: galery})
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    }).populate('place')
}

exports.delete = function (req, res) {
    Galery.findOneAndRemove({_id:req.params.id},function (error,galery) {
        if(!error){
            res.json({success: true, data: 'The item has been deleted'});
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    })
}


