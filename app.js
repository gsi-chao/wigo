var express = require('express');
var mongoose = require('mongoose');
require('mongoose-middleware').initialize(mongoose);
mongoose.Promise = require('bluebird');
var bodyParser = require('body-parser');
var http = require('http');
var passport = require('passport');
var cors  = require('cors');
var path = require('path');

/*
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
*/
var app = express();

/*
i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: __dirname + '/config/locales/{{lng}}.json',
            addPath: __dirname + '/config/locales/{{lng}}.missing.json'
        },
        fallbackLng: 'en',
        preload: ['en', 'es'],
        saveMissing: true
    });

app.use(i18nextMiddleware.handle(i18next));
*/

var config = require('./config/config');

mongoose.connect(config.database,function (error,res) {
    if(error) console.log("Error conectando a la BD");
    else console.log("Conexion establecida a mongodb");
})

var corsOptions = {
    origin: "*",
    credentials:true
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 8082);
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
var staticPath = path.resolve(__dirname, "public");
app.use(express.static(staticPath));
// Init Passport
app.use(passport.initialize());
app.use(passport.session());


/*http.createServer(app).listen(app.get('port'), function(){
    console.log('API WIGO server listening on port ' + app.get('port'));
});*/

require('./config/passport/local');
require('./config/passport/facebook');
//routes
require('./app/routes')(app, express);

module.exports = app;
