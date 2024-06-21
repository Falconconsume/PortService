const mongoose = require('mongoose')
const {databaseUrl} = require('./default')
require('colors')

const connectDB = async () => {
	const conn = await mongoose.connect(databaseUrl)
	console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB