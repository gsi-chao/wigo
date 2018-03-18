module.exports = function (app,express,controllers) {
    var router = express.Router();

    var authorization = require('./middlewares/authorization.js');
    //router.use(authorization.requiresLogin);

    router.route('/municipality')
        .get(controllers.municipality.findAll)
        .post(authorization.requiresLogin,controllers.municipality.save);

    router.route('/municipality/:id')
        .get(controllers.municipality.findById)
        .put(authorization.requiresLogin,controllers.municipality.update)
        .delete(authorization.requiresLogin,controllers.municipality.delete)

    app.use('/api',router);
}
