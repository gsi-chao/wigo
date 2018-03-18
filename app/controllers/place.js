var Place = require('../models/place');
var Contact = require('../models/contact');
var defaultController = require('../controllers/default');
var Attachment = require('../models/attachments');
exports.save = function (req, res) {
    var contact = new Contact(req.body.contact);
    contact.save(function (err,c) {
        if (!err) {
            req.body.contact = c._id;
            if (!req.files.picture) {
                return  res.status(401).send({success: false, message: 'No picture update'});
            }
            else {
                var file = req.files.picture;
                Attachment.write({
                        filename:file.name,
                        contentType:file.mimetype
                    },
                    file.data,
                    function(error, createdFile){
                        if(error){
                            return  res.status(401).send({success: false, message: 'Failed to upload file'});
                        }
                        else{
                            req.body.picture = createdFile._id;
                        }
                    });
                var place = new Place(req.body);
                place.save(function (err) {
                    if (!err) {
                        res.json({success: true, data: 'Insert Place'});
                    }
                    else {
                        res.status(401).send({success: false, message: err});
                    }
                })
            }
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    })
}

exports.update = function (req, res) {

    Place.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true}, function (err, place) {
        if (!err) {
            res.json({success: true, data: 'Update Place'});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    });
}

exports.findAll = function (req, res) {
    defaultController.findAll(req, res, Place, ['contact', 'type']);
}
exports.findNear = function (req, res) {
    if (req.query.longitude && req.query.latitude) {
        var coords = [];
        coords[0] = req.query.longitude;
        coords[1] = req.query.latitude;
        Place.find({
            loc: {
                $near: coords,
                $maxDistance: 1
            }
        }, function (err, locations) {
            if (err) {
                res.status(500).send({success: false, message: err});
            }
            res.json({success: true, data: locations});
        }).limit(req.query.limit || 10);
    }
    else {
        res.status(401).send({success: false, message: 'Longitude and latitude are not present in the query'});
    }

}

exports.findById = function (req, res) {
    Place.findById(req.params.id, function (error, place) {
        if (!error) {
            res.json({success: true, data: place})
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    }).populate('contact_info').populate('type')
}

exports.delete = function (req, res) {
    Place.findOneAndRemove({_id:req.params.id}, function (error, place) {
        if (!error) {
            res.json({success: true, data: 'The item has been deleted'});
        }
        else {
            res.status(401).send({success: false, message: err});
        }
    })
}




