const express = require("express");
const router = express();
const mongoose = require("mongoose");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
const requirelogin = require('../middlewares/requirelogin');

// Fetch user profile by ID and their associated posts...........................
router.get("/user/:id", async (req, res) => {
    try {
        // Fetch the user by ID and exclude the password field
        const user = await USER.findOne({ _id: req.params.id }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch posts posted by the user
        const posts = await POST.find({ postedBy: req.params.id })
            .populate("postedBy", "_id");

        // Send back the user data and their posts
        res.status(200).json({ user, posts });
    } catch (err) {
        // Catch and handle errors
        res.status(400).json({ error: "Something went wrong" });
    }
});

// to follow user................................................................
router.put("/follow", requirelogin, (req, res) => {
    USER.findByIdAndUpdate(
        req.body.followId,
        { $push: { followers: req.user._id } },
        { new: true }
    )
    .then(followedUser => {
        if (!followedUser) {
            return res.status(404).json({ error: "User to follow not found" });
        }
        // Update the current user's following list...............................
        return USER.findByIdAndUpdate(
            req.user._id,
            { $push: { following: req.body.followId } },
            { new: true }
        );
    })
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(err => {
        res.status(400).json({ error: err.message });
    });
}); 


// to unfollow krne ke liye.........................................................
router.put("/unfollow", requirelogin, (req, res) => {
    USER.findByIdAndUpdate(
        req.body.followId,
        { $pull: { followers: req.user._id } },
        { new: true }
    )
    .then(followedUser => {
        if (!followedUser) {
            return res.status(404).json({ error: "User to follow not found" });
        }
// Update the current user's following list........................................
        return USER.findByIdAndUpdate(
            req.user._id,
            { $pull: { following: req.body.followId } },
            { new: true }
        );
    })
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(err => {
        res.status(400).json({ error: err.message });
    });
});
// to upload profile pic ..........................................................
router.put("/uploadProfilePic", requirelogin, async (req, res) => {
    const { pic } = req.body;

    // Validate that 'pic' is provided
    if (!pic) {
        return res.status(400).json({ error: "No picture URL provided" });
    }

    try {
        const result = await USER.findByIdAndUpdate(
            req.user._id,
            { $set: { photo: pic } },
            { new: true } // This ensures the updated user document is returned
        );

        // Return the updated user object
        res.json(result);
    } catch (err) {
        // Catch any errors during the database operation
        return res.status(400).json({ error: err.message });
    }
});


module.exports = router; 