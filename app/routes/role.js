module.exports = function (app,express,controllers) {
    var router = express.Router();
    var authorization = require('./middlewares/authorization.js');
    //router.use(authorization.requiresLogin);
    router.route('/role')
        .get(controllers.role.findAll)
        .post(authorization.requiresLogin,controllers.role.save);

    router.route('/role/:id')
        .get(controllers.role.findById)
        .put(authorization.requiresLogin,controllers.role.update)
        .delete(authorization.requiresLogin,controllers.role.delete)

    app.use('/api',router);
}
