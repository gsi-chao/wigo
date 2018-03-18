module.exports = function (app,express,controllers) {
    var router = express.Router();
    var authorization = require('./middlewares/authorization.js');
    //router.use(authorization.requiresLogin);
    router.route('/province')
        .get(controllers.province.findAll)
        .post(controllers.province.save);

    router.route('/province/:id')
        .get(controllers.province.findById)
        .put(authorization.requiresLogin,controllers.province.update)
        .delete(controllers.province.delete)

    app.use('/api',router);
}
