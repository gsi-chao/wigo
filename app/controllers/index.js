var controllers = {};
// Requiring dependencies


var fs = require('fs');

var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js)/.test(file)) {
                if (file != 'index.js') {
                    var indent = file.split('.');
                    controllers[indent[0]] = require(newPath);
                }
            }
        } else if (stat.isDirectory()) {
            // walk(newPath);
        }
    });
};
var models_path = __dirname;
walk(models_path);

module.exports = controllers;

