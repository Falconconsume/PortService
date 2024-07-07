const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const {nodeEnv, port, secretKeyJWT} = require('./config/default')
const postRouter = require('./router/postRouter')
const authRouter = require('./router/authRouter')
const connectDB = require('./config/db')
const jwt = require("jsonwebtoken");

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true})); // to parse URL-encoded bodies
app.use(cookieParser())

connectDB()


app.use((req, res, next) => {
	res.locals.user = req.cookies?.token ? 1 : 0; // Assuming token presence means logged in
	next();
});

if (nodeEnv === 'dev') {
	app.use(morgan('dev'))
}

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'static')))

app.use('/pug', postRouter)
app.use('/auth', authRouter)


app.listen(port, () => console.log(`Server is running on port ${port}`))