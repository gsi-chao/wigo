module.exports = function (app,express,controllers) {
    var router = express.Router();
    var authorization = require('./middlewares/authorization.js');
    //router.use(authorization.requiresLogin);
    router.route('/thumbnail')
        .get(controllers.thumbnail.findAll)
        .post(authorization.requiresLogin,controllers.thumbnail.save);

    router.route('/thumbnail/:id')
        .get(controllers.thumbnail.findById)
        .put(controllers.thumbnail.update)
        .delete(authorization.requiresLogin,controllers.thumbnail.delete)

    app.use('/api',router);
}
