module.exports = function (app,express,controllers) {
    var router = express.Router();
    var authorization = require('./middlewares/authorization.js');
    //router.use(authorization.requiresLogin);
    router.route('/comment')
        .get(controllers.comment.findAll)
        .post(authorization.requiresLogin,controllers.comment.save);

    router.route('/comment/:id')
        .get(controllers.comment.findById)
        .put(authorization.requiresLogin,controllers.comment.update)
        .delete(authorization.requiresLogin,controllers.comment.delete)

    app.use('/api',router);
}
