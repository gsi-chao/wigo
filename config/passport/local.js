var User = require('../../app/models/user.js');
var config = require('./../config.js'); // get db config file
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var jwt = require('jsonwebtoken');
passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    // query the current user from database
    User.findOne({username:username}, function (error,user) {
        if(!error) done(null, user);
        else done(err);
    })
});

passport.use(new LocalStrategy({
        // set the field name here
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {
        User.findOne({username:username},function (error,user) {
            if(!error){
                if(user!=null){
                    var ver = user.verifyPassword(password)
                   if(ver){
                     if(!user.isActive()) return done(null, false, {message: "User disable"});

                       // if user is found and password is right
                       // create a token
                       var token = jwt.sign(user, config.secret,{ expiresIn:'100 days'});
                       // return the information including token as JSON
                       // if everything is OK, return null as the error
                       // and the authenticated user
                       var useraux = JSON.stringify(user);
                       var useraux = JSON.parse(useraux);
                       useraux.token = token;

                       return done(null, useraux);
                   }
                   else{
                       // if password does not match
                       return done(null, false, {message: "Wrong password"});
                   }
                }
                else{
                    // if the user is not exist
                    return done(null, false, {message: "User no found"});
                }
            }
            else{
                return done(null, false, {message: error});
            }
        }).populate('role');
    }
));
