module.exports = function (app,express,controllers) {
    var router = express.Router();
    var authorization = require('./middlewares/authorization.js');
    //router.use(authorization.requiresLogin);
    router.route('/contact')
        .get(controllers.contact.findAll)
        .post(authorization.requiresLogin,controllers.contact.save);

    router.route('/contact/:id')
        .get(controllers.contact.findById)
        .put(authorization.requiresLogin,controllers.contact.update)
        .delete(authorization.requiresLogin,controllers.contact.delete)

    app.use('/api',router);
}
