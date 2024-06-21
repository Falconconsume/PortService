const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
	comment: {type: String, maxLength: [50, 'you should write less than 50 characters!']}
})

module.exports = mongoose.model('Comment', CommentSchema)