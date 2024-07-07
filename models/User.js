const mongoose = require('mongoose');
const Roles = require('./Roles');
const Post = require('./Post');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: Roles
	}],
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: Post
	}]
});

module.exports = mongoose.model('User', userSchema);
