const HttpError = require('../models/Error');

class PageRenderController {
	async renderLoginPage(req, res, next) {
		try {
			res.render('login', { user: req.user });
		} catch (err) {
			console.log(err);
			next(new HttpError('Render login page error', 500));
		}
	}

	async renderRegisterPage(req, res, next) {
		try {
			res.render('register', { user: req.user });
		} catch (err) {
			console.log(err);
			next(new HttpError('Render register page error', 500));
		}
	}

	async renderPostCreation(req, res, next) {
		try {
			res.render('postCreation', { user: req.user });
		} catch (err) {
			console.log(err);
			next(new HttpError('Render postCreation page error', 500));
		}
	}
}

module.exports = new PageRenderController();
