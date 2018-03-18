var Contact = require('../models/contact');
var defaultController = require('../controllers/default');
exports.save = function (req, res) {
    var contact = new Contact(req.body);
    contact.save(function (err) {
        if (!err) {
            res.json({success: true, data: 'Insert Comment'});
            //res.json({success: true, data: thumb});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.update = function (req, res) {

    Contact.findOneAndUpdate({_id:req.params.id},req.body,{upsert:true},function (err,contact) {
        if (!err) {
            res.json({success: true, data: 'Update Contact'});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    });
}

exports.findAll = function (req,res) {
    defaultController.findAll(req,res,Contact);
}

exports.findById = function (req,res) {
    Contact.findById(req.params.id,function (error,contact) {
        if(!error){
            res.json({success: true, data: contact})
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.delete = function (req, res) {
    Contact.findOneAndRemove({_id:req.params.id},function (error,contact) {
        if(!error){
            res.json({success: true, data: 'The item has been deleted'});
        }
        else{
            res.status(401).send({success: false, message: err});
        }
    })
}


