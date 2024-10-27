const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types; // Keep this line to get ObjectId from mongoose
const requirelogin = require('../middlewares/requirelogin');

// Ensure the POST model is defined correctly
const POST = mongoose.model("POST"); // This should correspond to your Mongoose model

// Route to get all posts.............................................
router.get("/allposts", requirelogin, (req, res) => {
    POST.find()
        .populate("postedBy", "_id name photo")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => console.log(err));
});

// Route to create a new post..........................................
router.post("/createPost", requirelogin, (req, res) => {
    const { body, pic } = req.body;
    console.log(pic);
    if (!pic || !body) {
        return res.status(400).json({ error: "Please add all the fields" });
    }

    // Create a new post object.......................................
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user // Ensure `req.user` is populated correctly
    });

    post.save()
        .then((result) => {
            return res.json({ post: result });
        })
        .catch(err => console.log(err));
});

// User profile posts.....................................
router.get("/myposts", requirelogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(myposts => {
            res.json(myposts);
        })
        .catch(err => console.log(err)); // Added error handling here
});

// Like a post.............................................
router.put("/like", requirelogin, async (req, res) => {
    try {
        const result = await POST.findByIdAndUpdate(
            req.body.postId,
            { $push: { likes: req.user._id } },
            { new: true }
        ).populate("postedBy","_id name photo")
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Unlike a post.........................................
router.put("/unlike", requirelogin, async (req, res) => {
    try {
        const result = await POST.findByIdAndUpdate(
            req.body.postId,
            { $pull: { likes: req.user._id } },
            { new: true }
        ).populate("postedBy", "_id name photo")
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});

// Comment on a post......................................
router.put("/comment", requirelogin, async (req, res) => {
    try {
        const comment = {
            comment: req.body.text, // Changed from 'comment' to 'text' for consistency
            postedBy: req.user._id
        };

        const result = await POST.findByIdAndUpdate(
            req.body.postId,
            { $push: { comments: comment } },
            { new: true }
        ).populate("comments.postedBy", "_id name photo");

        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// Delete post route api................................
router.delete('/deletePost/:postId', requirelogin, async (req, res) => {
    try {
        const { postId } = req.params;

        // Validate ObjectId (optional, but good for error handling)
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ error: 'Invalid Post ID' });
        }

        // Find and delete the post
        const post = await POST.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// api to delete post....................................
// router.delete("/deletePost/:postId", requirelogin,(req, res)=>{
//     POST.deleteOne({_id:req.params.postId})
//     .populate("postedBy","_id")
//     .exec((err, post)=>{
//         if(err || !post){
//             return res.status(400).json({error:err})
//         }
//         if(post.postedBy._id.toString() == req.user._id.toString()){
//             post.remove()
//             .then(result=>{
//                 return res.json({message:"successfully delted"})
//             }).catch((err)=>{
//                 console.log("bhosdi ke galat ho gya")
//                 console.log(err)
//             })
//         }
//     })
// })

//to show following post....................................
router.get("/myfollowingpost", requirelogin, (req, res)=>{ 
    POST.find({postedBy:{$in: req.user.following}})
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .then(posts=>{
        res.json(posts)
    })
    .catch(err => {console.log(err)})

})

module.exports = router;   
