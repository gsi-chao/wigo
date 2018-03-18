var PlaceType = require('../models/place_type');
var defaultController = require('../controllers/default');
var formidable = require('formidable');
var fs = require('fs-extra');
var im = require("imagemagick");
exports.save = function (req, res) {
    var data;
    var options = {
        uploadDir: "public/uploads/icons", maxFieldsSize: 2 * 1024 * 1024,
        maxFields: 1, keepExtensions: true
    };
    var form = new formidable.IncomingForm(options);
    form.parse(req, function (err, fields, files) {
        data = JSON.parse(fields.placetype);
    });

    form.on('error', function (err) {
        res.status(401).send({success: false, message: err});
    });
    form.on('end', function () {
        data.url = this.openedFiles[0].path;
        data.icon = defaultController.getImgUrlName(this.openedFiles[0], req);
        var options = {
            width: 80,
            height: 80,
            srcPath: this.openedFiles[0].path,
            dstPath: this.openedFiles[0].path
        };

        im.resize(options, function(err) {
            if(err) { throw err; }
            var place_type = new PlaceType(data);
            place_type.save(function (err) {
                if (!err) {
                    res.json({success: true, data: 'Insert Place Type'});
                    //res.json({success: true, data: thumb});
                }
                else {
                    res.status(401).send({success: false, message: err});
                }
            });
        });

    });


}

exports.update = function (req, res) {

    PlaceType.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true}, function (err, place_type) {
        if (!err) {
            res.json({success: true, data: 'Update Place Type'});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    });
}

exports.findAll = function (req, res) {
    defaultController.findAll(req, res, PlaceType);
}

exports.findById = function (req, res) {
    PlaceType.findById(req.params.id, function (error, place_type) {
        if (!error) {
            res.json({success: true, data: place_type})
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.delete = function (req, res) {
    PlaceType.findOneAndRemove({_id: req.params.id}, function (error, place_type) {
        if (!error) {
            fs.unlink(place_type.url,function (error) {
                console.info(error);
            });
            res.json({success: true, data: 'The item has been deleted'});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    })
}


