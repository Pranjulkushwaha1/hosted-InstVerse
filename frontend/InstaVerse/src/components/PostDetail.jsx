import React, { useState } from 'react';
import './PostDetail.css';
import { MdMood } from "react-icons/md";

function PostDetail({ item, toggleDetails }) {
    const [comment, setComment] = useState("");

    // const removePost = async (postId) => {
    //     try {
    //         const res = await fetch(`http://localhost:5000/deletePost/${postId}`, {  // Full URL
    //             method: "delete",
    //             headers: {
    //                 "Authorization": "Bearer " + localStorage.getItem("jwt"),  // Ensure JWT exists
    //                 "Content-Type": "application/json"  // This helps server understand the request type
    //             }
    //         });

    //         if (!res.ok) {
    //             const errorData = await res.json();
    //             throw new Error(errorData.error || "Failed to delete post");
    //         }

    //         const data = await res.json();  // Safely parse the response
    //         console.log("Post deleted successfully:", data);
    //     } catch (error) {
    //         console.log("Error while deleting post:", error.message);
    //     }
    // }; 
    // const removePost = (postId) => {
    //     console.log(postId);
    //     fetch(`http://localhost:5000/deletePost/${postId}`, {
    //         method: "delete",
    //         headers: {
    //             Authorization: "Bearer " + localStorage.getItem("jwt"),
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((result) => {
    //             console.log(result)
    //         })
    // }
    const removePost = async (postId) => {
        try {
            const res = await fetch(`/deletePost/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                }
            });
            if (res.status === 404) {
                console.log("Post not found");
                alert("The post you are trying to delete does not exist.");
                return;
            }
            if (!res.ok) {
                throw new Error("Failed to delete post. Status: " + res.status);
            }
            const data = await res.json();
            console.log("Post deleted successfully:", data);
        } catch (error) {
            console.log("Error deleting post:", error.message); 
        }
    };
    
    

    return (
        <>
            <div>
                {/*  show Comment  */}
                <div className="showComment">
                    <div className="container">
                        <div className="postPic">
                            <img src={item.photo} alt="" />
                        </div>
                        <div className="details">
                            <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
                                {/* card pic */}
                                <div className="card-pic">
                                    <img className='img1' src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="ghgh" />
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <h3>{item.postedBy.name}</h3>
                                <div className="deletePost" onClick={() => { removePost(item._id) }}>
                                    <span className="material-symbols-outlined">delete</span>
                                </div>

                            </div>

                            {/* comment section */}
                            <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
                                {item.comments && item.comments.length > 0 ? (
                                    item.comments.map((comment) => (
                                        <p className='comm' key={comment._id}>
                                            <span className='commenter' style={{ fontWeight: "bolder" }}>
                                                {comment.postedBy.name ? comment.postedBy.name : "Anonymous"}
                                            </span>
                                            <span className='commentText'>{comment.text ? comment.text : "post"} awesome pic</span>
                                        </p>
                                    ))
                                ) : (
                                    <p>No comments available</p>
                                )}
                            </div>

                            {/* card content */}
                            <div className="card-content">
                                <p>{item.likes.length}</p>
                                <p>{item.body}</p>
                            </div>

                            {/* add comment */}
                            <div className="add-comment">
                                <MdMood /><br />
                                <input
                                    className='inp'
                                    type="text"
                                    placeholder='Add a Comment'
                                    value={comment}
                                    onChange={(e) => { setComment(e.target.value) }} // Add onChange handler
                                /><br /><br />
                                <button className='comment'
                                // Implement functionality to post a comment
                                >
                                    Post
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="close-comment">
                        <span className='material-symbols-outlined material-symbols-outlined-comment'
                            onClick={() => { toggleDetails(null) }}
                        >close</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostDetail;
