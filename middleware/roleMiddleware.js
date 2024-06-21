const jwt = require("jsonwebtoken");
const {secretKeyJWT} = require('../config/default')
const HttpError = require("../models/Error");

module.exports = (roles) => {
	return (req, res, next) => {
		if (req.method === 'OPTIONS') {
			next()
		}

		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token) {
				return next(new HttpError('User isn`t authorized', 403))
			}
			const {roles: userRoles} = jwt.verify(token, secretKeyJWT)
			let hasRole = false;

			userRoles.forEach((role) => {
				if (roles.includes(role)) {
					hasRole = true
				}
			})

			if (!hasRole) {
				return next(new HttpError('You don`t have an access', 403))
			}
			next()
		} catch (err) {
			console.log(err)
			return next(new HttpError('User isn`t authorized', 403))
		}
	}
}