module.exports = function (app,express,controllers) {
    var router = express.Router();

    var authorization = require('./middlewares/authorization.js');
    //router.use(authorization.requiresLogin);

    router.route('/galery')
        .get(controllers.galery.findAll)
        .post(authorization.requiresLogin,controllers.galery.save);

    router.route('/galery/:id')
        .get(controllers.galery.findById)
        .put(authorization.requiresLogin,controllers.galery.update)
        .delete(authorization.requiresLogin,controllers.galery.delete)

    app.use('/api',router);
}
