const jwt = require('jsonwebtoken')
const HttpError = require('../models/Error')
const {secretKeyJWT} = require('../config/default')
module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return next(new HttpError('User isn`t authorized', 403))
		}
		req.user = jwt.verify(token, secretKeyJWT)
		next()
	} catch (err) {
		console.log(err)
		return next(new HttpError('User isn`t authorized', 403))
	}
}