const express = require('express')
const morgan = require('morgan')
const path = require('path')
const {nodeEnv, port} = require('./config/default')
const postRouter = require('./router/postRouter')
const authRouter = require('./router/authRouter')
const connectDB = require('./config/db')

const app = express()

app.use(express.json())

connectDB()

if (nodeEnv === 'dev') {
	app.use(morgan('dev'))
}

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'static')))

app.use('/pug', postRouter)
app.use('/auth', authRouter)


app.listen(port, () => console.log(`Server is running on port ${port}`))