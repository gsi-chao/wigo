var User = require('../models/user');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var url = require('url');
var defaultController = require('../controllers/default');
var mongooseErrorHandler = require('mongoose-error-handler');

exports.save = function (req, res) {
    var user = new User(req.body);

    user.save(function (err) {
        if (!err) {
            res.json({success: true, data: 'Insert User'});
        }
        else {
            res.status(401).send({success: false, message: mongooseErrorHandler.set(err)});
        }
    })
}



exports.update = function (req, res) {
    User.findOneAndUpdate({_id:req.params.id},req.body,{upsert:true},function (err,user) {
        if (!err) {
            user.password = req.body.password;
            user.save(function (error) {
                if(!error){
                    res.json({success: true, data: user})
                }
                else{
                    res.json({success: false, data: mongooseErrorHandler.set(error)});
                }
            });


        }
        else {
            res.status(401).send({success: false, message: err});
        }
    });
}

exports.findAll = function (req,res) {
    defaultController.findAll(req,res,User,['role'],[]);
}


exports.findById = function (req,res) {
    User.findById(req.params.id,function (error,user) {
        if(!error){
            res.json({success: true, data: user})
        }
        else{
            res.status(401).send({success: false, message: mongooseErrorHandler.set(error)});
        }
    }).populate('role')
}


exports.delete = function (req, res) {
    User.findOneAndRemove({_id:req.params.id},function (error,user) {
        if(!error){
            res.json({success: true, data: 'The item has been deleted: '+user.id});
        }
        else{
            res.status(401).send({success: false, message: mongooseErrorHandler.set(err)});
        }
    })
}

/**
 * Signin after passport authentication
 */
exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
            res.status(400).send(info);
        } else {
            req.login(user, function(error) {
                if (err) {
                    res.status(400).send(error);
                } else {
                    delete(user.password);
                    var userFull={user:user}
                    res.jsonp({success:true,message:userFull});
                }
            });
        }
    })(req, res, next);
};



