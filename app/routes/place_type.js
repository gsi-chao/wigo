module.exports = function (app,express,controllers) {
    var router = express.Router();
    var authorization = require('./middlewares/authorization.js');
    //router.use(authorization.requiresLogin);
    router.route('/placetype')
        .get(controllers.place_type.findAll)
        .post(controllers.place_type.save);
    router.route('/placetype/:id')
        .get(controllers.place_type.findById)
        .put(authorization.requiresLogin,controllers.place_type.update)
        .delete(authorization.requiresLogin,controllers.place_type.delete)

    app.use('/api',router);
}
