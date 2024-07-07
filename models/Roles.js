const mongoose = require('mongoose')

const Roles = mongoose.Schema({
	value: {type: String, unique: true, default: 'user'}
})

module.exports = mongoose.model('Roles', Roles)