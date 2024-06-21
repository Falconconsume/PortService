require('dotenv').config()

const port = process.env.PORT || 5000

const databaseUrl = process.env.DATA_URL

const secretKeyJWT = process.env.SECRET_KEY_JWT

const nodeEnv = process.env.NODE_ENV || 'dev'

module.exports = {
	port,
	databaseUrl,
	secretKeyJWT,
	nodeEnv
}