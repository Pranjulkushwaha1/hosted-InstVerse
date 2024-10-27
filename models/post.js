// //database ko bta rhe h ki kya dalna h database me
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// ek nya schema bna rhe h
const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{ type: ObjectId, ref: "USER" }],
    comments: [{
        comment: { type: String },
        postedBy: { type: ObjectId, ref: "USER" }
    }], 
    postedBy: {
        type: ObjectId,   
        ref: "USER"
    }
},{timestamps:true})  
mongoose.model("POST", postSchema);    