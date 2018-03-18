var mongooseErrorHandler = require('mongoose-error-handler');
var mongoose = require('mongoose');
exports.findAll = function (req,res,Schema,populate,filters) {
    var count = req.query.count !==undefined ? req.query.count : 100;
    var page = req.query.pages !==undefined ? req.query.pages : 1;
    delete(req.query.count);
    delete(req.query.pages);

    var mandatory = {};

    for(var query in req.query){
        for(var aux in req.query[query]){
            if(populate.indexOf(aux) >= 0){
                mandatory[query] = {};
                mandatory[query][aux] = mongoose.Types.ObjectId(req.query[query][aux]) ;
            }else{
                mandatory[query] = {};
                mandatory[query][aux] = req.query[query][aux] ;
            }
        }
    }
    var filter = {
        filters: {
            mandatory : mandatory,
            field : filters || []
        }
    };
    var pagination = {
        start: (page - 1) * count,
        count: count
    };
    var sort = {
        sort: {
            desc: req.query.sort || '_id'
        }
    };

    Schema
        .find()
        .populate(populate||[])
        .field(filter)
        .filter(filter)
        .order(sort)
        .page(pagination,function (error,element) {
            if(!error){
                res.json({success: true, data: element})
            }
            else{
                res.status(401).send({success: false, message: mongooseErrorHandler.set(error)});
            }
        })
}

exports.getImgUrlName = function (file,req) {
    var temp_path = file.path;
    var ext = temp_path.split('public/');
    var url = req.protocol + '://' + req.get('host') +'/'+ ext[1];
    return url;
}

