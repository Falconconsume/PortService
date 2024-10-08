const mongoose = require('mongoose')
const Comment = require('./Comments')
const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please add a title to your title'],
		maxLength: [30, 'Title can`t be more than 30 characters!']
	},
	content: {type: String, required: [true, 'Please add a content to your post']},
	comments: [{type: String, ref: Comment}]
})

module.exports = mongoose.model('Post', PostSchema)