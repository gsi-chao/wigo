'use strict';

var config = require('../../../config/config.js');
var jwt = require('jsonwebtoken');


// Login required
exports.requiresLogin = function(req, res, next) {

	var token = req.body.token || req.query.token || req.headers.token || req.headers.authorization;
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});

	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});

	}
};
exports.getToken = function (headers) {
	if (headers && headers.authorization) {
		return headers.authorization;
	} else {
		return null;
	}
};