const mongoose = require('mongoose')

const Roles = mongoose.Schema({
	value: {type: String, unique: true, default: 'admin'}
})

module.exports = mongoose.model('Roles', Roles)