
module.exports = function (app,express,controllers) {
    var router = express.Router();
    var authorization = require('./middlewares/authorization.js');
    //router.use(authorization.requiresLogin);
    router.route('/user')
        .get(controllers.user.findAll)
        .post(controllers.user.save);
 /*   router.route('/user/condition')
        .get(controllers.user.findByConditions)*/

    router.route('/user/:id')
        .get(controllers.user.findById)
        .put(controllers.user.update)
        .delete(controllers.user.delete)


    app.use('/api',router);
}
