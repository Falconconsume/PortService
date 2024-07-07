// controllers/PostController.js
const Post = require('../models/Post');
const User = require('../models/User');
const mongoose = require("mongoose");

class PostController {
	async getAllPosts(req, res) {
		try {
			const postsList = await Post.find().sort({ createdAt: -1 }).populate('comments');
			res.render('index', { postsList });
		} catch (err) {
			console.error('Error fetching posts:', err);
			res.status(500).json({ error: 'Failed to fetch posts' });
		}
	}

	async createPost(req, res) {
		try {
			const { title, content } = req.body;
			const post = await Post.create({ title, content });
			await User.findByIdAndUpdate(
				req.user.id,
				{ $push: { posts: post._id } },
				{ new: true, useFindAndModify: false }
			);
			res.redirect(`/pug`);
		} catch (err) {
			console.error('Error creating post:', err);
			res.status(500).json({ error: 'Failed to create post' });
		}
	}
}

module.exports = new PostController();
