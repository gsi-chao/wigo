module.exports = function(app, express) {
    var passport = require('passport');

    var controllers = require('../controllers');



    app.route('/login')
        .post(controllers.user.login);


    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook',  {  failureRedirect : '/'}),
        // on succes
        function(req,res,next) {
            // return the token or you would wish otherwise give eg. a succes message

            res.send({data: JSON.stringify(req.user)});
        },
        // on error; likely to be something FacebookTokenError token invalid or already used token,
        // these errors occur when the user logs in twice with the same token
        function(err,req,res,next) {
            // You could put your own behavior in here, fx: you could force auth again...
            // res.redirect('/auth/facebook/');
            if(err) {
                res.status(400);
                res.send({message: err.message});
            }
        }
    );
    app.get('/auth/facebook',
        passport.authenticate('facebook', { authType: 'rerequest',scope: ['email','public_profile','user_friends'] }),
        function(req, res) {
            // The request will be redirected to Facebook for authentication, so this
            // function will not be called.
        });

    app.all('*', function (req, res, next) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, X-Requested-With,Accept");

        if ('OPTIONS' == req.method) {
            return res.sendStatus(200);
        }
        next();
    });


    var fs = require('fs')
    var walk = function (path) {
        fs.readdirSync(path).forEach(function (file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);
            if (stat.isFile()) {
                if (/(.*)\.(js)/.test(file)) {
                    if (file != 'index.js') {
                        require(newPath)(app, express,controllers);
                    }
                }
            } else if (stat.isDirectory()) {
                // walk(newPath);
            }
        });
    };
    var models_path = __dirname;
    walk(models_path);
};
