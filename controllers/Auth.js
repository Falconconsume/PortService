const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Roles = require('../models/Roles');
const Comment = require("../models/Comments");
const Post = require("../models/Post");

function generateAccessToken(id, roles) {
	const payload = {id, roles};
	return jwt.sign(payload, process.env.SECRET_KEY_JWT, {expiresIn: '24h'});
}

class AuthController {
	async login(req, res) {
		try {
			const {username, password} = req.body;
			const user = await User.findOne({username});
			if (!user) {
				return res.status(404).json({error: 'User not found!'});
			}
			const candidate = await bcrypt.compare(password, user.password);
			if (candidate) {
				const token = generateAccessToken(user._id, user.role);
				res.cookie('token', token);
				res.redirect('/pug');
			} else {
				return res.status(401).json({error: 'Invalid password'});
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({error: 'Login error'});
		}
	}

	async register(req, res) {
		try {
			const {username, password} = req.body;
			const candidate = await User.findOne({username});
			if (candidate) {
				return res.status(400).json({error: 'User already exists'});
			}
			const hashedPassword = bcrypt.hashSync(password, 7);
			const role = await Roles.findOne({value: 'user'});
			const user = await User.create({
				username,
				password: hashedPassword,
				role: [role.id],
				posts: []
			});
			res.redirect('/auth/login');
		} catch (err) {
			console.log(err);
			res.status(500).json({error: 'Registration error'});
		}
	}

	async getUsers(req, res) {
		try {
			const users = await User.find();
			res.render('admin', {users});
		} catch (err) {
			console.log(err);
			res.status(500).json({message: 'Get users error'});
		}
	}

	async deleteUser(req, res) {
		try {
			const {userId} = req.params;
			await User.findByIdAndDelete(userId)

			const posts = await Post.find({user: userId})

			for(let post of posts) {
				await Comment.deleteMany({postId: post._id})
				await post.deleteOne()
			}

			res.redirect(`/auth/admin`)
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: 'Delete user error' });
		}
	}

	async logout(req, res) {
		res.clearCookie('token')
		res.redirect('/pug');
	}
}

module.exports = new AuthController();
