const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

/* business logic */
exports.createComment = async (req, res) => {
    try{
        /* fetch Data from request body */
        const {post,user, body} = req.body;
        /* create a new comment */
        const comment = new Comment({
            post,user,body
        });
        /* save the Comment into the database */
        const savedComment = await comment.save();
        /* Find the post by ID, add the new Comment to it's comment array */
        const updatedPost = await Post.findByIdAndUpdate(post,{$push: {comments: savedComment._id}}, {new : true}).populate("comments").exec();
        /* Populate is needed to give the comment instead of their ID */
        res.json({
            post: updatedPost
        })
        
    }
    catch(err){
        res.status(500).json({
            error: 'Error Creating Comment'
        });
    }
}