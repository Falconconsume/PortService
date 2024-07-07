const jwt = require('jsonwebtoken')
const HttpError = require('../models/Error')
const {secretKeyJWT} = require('../config/default')
module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		next()
	}
	try {
		const token = req.cookies.token
		if (!token) {
			return res.redirect('/auth/login')
		}
		req.user = jwt.verify(token, secretKeyJWT)
		next()
	} catch (err) {
		console.log(err)
		return next(new HttpError('User isn`t authorized', 403))
	}
}