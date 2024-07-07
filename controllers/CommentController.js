const mongoose = require('mongoose');
const Post = require('../models/Post');
const Comment = require('../models/Comments');

class CommentController {
    async createComment (req, res) {
        try {
            const {content} = req.body;
            const postId = req.params.postId;
            const userId = req.user.id;
            const comment = await Comment.create({content, postId, author: userId});
            await Post.findByIdAndUpdate(postId, {$push: {comments: comment._id}}, {new: true});
            res.redirect(`/pug`);
        } catch (err) {
            console.error('Error creating comment:', err);
        }
    }
    async deleteComment (req, res) {
        const {commentId} = req.params;

        const userId = req.user.id;

        const comment = await Comment.findByIdAndDelete(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        if (comment.author.toString() !== userId) {
            return res.status(403).json({ error: 'Unauthorized to delete this comment' });
        }

        await comment.deleteOne();

        await Post.findByIdAndUpdate(comment.postId, { $pull: { comments: comment._id } }, { new: true });

        res.redirect(`/pug/myPosts/`);
    }
}

module.exports =  new CommentController();