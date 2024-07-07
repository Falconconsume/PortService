const express = require('express');
const postRouter = express.Router();
const pageRender = require('../controllers/pageRender');
const PostController = require('../controllers/Posts');
const MyPostController = require('../controllers/MyPostsController');
const CommentController = require('../controllers/CommentController');
const authMiddleware = require('../middleware/authMiddleware');

postRouter.get('/', PostController.getAllPosts);

postRouter.route('/create')
    .get(pageRender.renderPostCreation)
    .post(authMiddleware, PostController.createPost);

postRouter.route('/myPosts').get(authMiddleware, MyPostController.showPosts)
postRouter.route('/comment/:postId').post( authMiddleware, CommentController.createComment).get(pageRender.renderCommentsPage);
postRouter.route('/delete/:postId').get(authMiddleware, MyPostController.deletePost);
postRouter.route('/deleteComment/:commentId').get(authMiddleware,CommentController.deleteComment);

module.exports = postRouter;
