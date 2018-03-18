var Role = require('../models/role');
var defaultController = require('../controllers/default');
exports.save = function (req, res) {
    var role = new Role(req.body);
    role.save(function (err) {
        if (!err) {
            res.json({success: true, data: 'Insert Role'});
            //res.json({success: true, data: thumb});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.update = function (req, res) {

    Role.findOneAndUpdate({_id:req.params.id},req.body,{upsert:true},function (err,role) {
        if (!err) {
            res.json({success: true, data: 'Update Role'});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    });
}

exports.findAll = function (req,res) {
    defaultController.findAll(req,res,Role);
}

exports.findById = function (req,res) {
    Role.findById(req.params.id,function (error,role) {
        if(!error){
            res.json({success: true, data: role})
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.delete = function (req, res) {
    Role.findOneAndRemove({_id:req.params.id},function (error,role) {
        if(!error){
            res.json({success: true, data: 'The item has been deleted'});
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    })
}


