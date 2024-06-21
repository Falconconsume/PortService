const postRouter = require('express').Router();
const pageRender = require('../controllers/pageRender')
const PostController = require('../controllers/Posts')

postRouter.get('/', PostController.getAllPosts)

postRouter.get('/create', pageRender.renderPostCreation).post('/create', PostController.createPost)

module.exports = postRouter