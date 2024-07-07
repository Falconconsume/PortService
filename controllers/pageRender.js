const HttpError = require('../models/Error');
const Post  = require('../models/Post');

class PageRenderController {
	async renderLoginPage(req, res, next) {
		try {
			res.render('login');
		} catch (err) {
			console.log(err);
			next(new HttpError('Render login page error', 500));
		}
	}

	async renderRegisterPage(req, res, next) {
		try {
			res.render('register');
		} catch (err) {
			console.log(err);
			next(new HttpError('Render register page error', 500));
		}
	}

	async renderPostCreation(req, res, next) {
		try {
			res.render('postCreation');
		} catch (err) {
			console.log(err);
			next(new HttpError('Render postCreation page error', 500));
		}
	}

	async renderCommentsPage(req, res, next) {
		try {
			const postID = req.params.postId;
			const post = await Post.findById(postID);
			res.render('comments', {post});
		} catch (err) {
			console.log(err);
			next(new HttpError('Render postCreation page error', 500));
		}
	}
}

module.exports = new PageRenderController();
