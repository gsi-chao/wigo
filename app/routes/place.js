module.exports = function (app,express,controllers) {
    var router = express.Router();

    var authorization = require('./middlewares/authorization.js');
    //router.use(authorization.requiresLogin);
    router.route('/place')
        .get(controllers.place.findAll)
        .post(authorization.requiresLogin,controllers.place.save);

    router.route('/place/near')
        .get(controllers.place.findNear);

    router.route('/place/:id')
        .get(controllers.place.findById)
        .put(authorization.requiresLogin,controllers.place.update)
        .delete(authorization.requiresLogin,controllers.place.delete)

    app.use('/api',router);
}
