const jwt = require("jsonwebtoken");
const { secretKeyJWT } = require('../config/default');
const HttpError = require("../models/Error");
const Role = require("../models/Roles");

module.exports = (roles) => {
	return async (req, res, next) => {
		if (req.method === 'OPTIONS') {
			return next();
		}

		try {
			const token = req.cookies.token;
			if (!token) {
				throw new HttpError('User is not authorized', 403);
			}

			const { roles: userRoles } = jwt.verify(token, secretKeyJWT);
			const role = await Role.findById(userRoles);
			console.log(role)
			if (!role || !roles.includes(role.value)) {
				throw new HttpError('You do not have access', 403);
			}

			next();
		} catch (err) {
			console.error(err);
			next(new HttpError('User is not authorized', 403));
		}
	};
};
