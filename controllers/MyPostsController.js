const User = require('../models/User');

class MyPostsController {
    async showPosts(req, res) {
        console.log(req.user);
        const post = await User.findById(req.params.id)
        console.log(post)
    }
}

module.exports = new MyPostsController();