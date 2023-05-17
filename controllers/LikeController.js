/* Import Models */ 
const Post = require('../models/postModel');
const Like = require('../models/likeModel');

exports.likePost = async(req,res) => {
    try {
        const {post,user} = req.body;
        const like = new Like({
            post, user
        })
        const savedLike = await like.save();
        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {likes: savedLike._id} }, {new: true}).populate("likes").exec();
        res.status(200).json({
            posts: updatedPost, 
        })

    }
    catch (err) {
        res.status(500).json({
            error: 'Error liking post'
        })
    }
}
exports.unlikePost = async(req, res) => {
    try {
        const {post,like} = req.body;
        /* Find and delete from Like Collections */
        const deletedLike = await Like.findOneAndDelete({post: post, _id: like});
        /* Update the Post Collection */
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deletedLike._id} } , {new: true});
        res.status(200).json({
            post: updatedPost
        })
    }
    catch (err) {
        res.status(500).json({
            error: 'Error unliking post'
        })
    }
}

