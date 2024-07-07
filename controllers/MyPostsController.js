const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comments'); // Corrected model name
const HttpError = require("../models/Error");
const jwt = require("jsonwebtoken");

class MyPostsController {
    async showPosts(req, res) {
        try {
            const userID = req.user.id;
            const user = await User.findById(userID);
            if (!user) {
                throw new HttpError('User not found', 404);
            }

            const allMyPosts = user.posts;
            const posts = await Post.find({ _id: { $in: allMyPosts } });

            let comment;
            for (const post of posts) {
                const comments = await Comment.find({ postId: post._id }); // Changed to find all comments for a post
                comment = comments
            }

            res.render('myPosts', { allMyPosts: posts, comments: comment });
        } catch (error) {
            console.error(error);
            throw new HttpError('Error fetching posts:', error.message, 500);
        }
    }

    async deletePost(req, res) {
        try {
            const userID = req.user.id;
            const { postId } = req.params;

            const user = await User.findById(userID);
            if (!user) {
                throw new HttpError('User not found', 404);
            }

            const post = await Post.findById(postId);
            if (!post) {
                throw new HttpError('Post not found', 404);
            }

            user.posts.pull(postId);
            await user.save();

            await Comment.deleteMany({ postId: postId });

            await post.deleteOne();

            res.redirect('/pug/myPosts');
        } catch (error) {
            console.error(error);
            throw new HttpError('Error deleting post:', error.message, 500); // Throw the error to be handled globally or by middleware
        }
    }
}

module.exports = new MyPostsController();
