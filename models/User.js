const mongoose = require('mongoose')
const Roles = require('./Roles')
const User = mongoose.Schema({
	username: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	role: [{type: String, ref: Roles}]
})

module.exports = mongoose.model('User', User)