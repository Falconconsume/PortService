const Post = require('../models/Post')

class PostController {
	async getAllPosts(req, res) {
		const postsList = await Post.find().sort({updatedAt: -1})
		res.render('index', {postsList})
	}

	async createPost(req, res) {
		const post = Post.create(req.body)
		res.render('postCreation')
		res.status(201).json({
			success: true,
			data: post
		})
	}

}

module.exports = new PostController()