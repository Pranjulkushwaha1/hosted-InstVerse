import React, { useEffect, useState } from 'react';
import { MdMood } from "react-icons/md";
import './Home.css';
import { useNavigate, Link } from 'react-router-dom';
import {toast} from 'react-toastify';

function Home() {
    var piclink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [comment, setComment] = useState(""); // Comment to be added
    const [show, setShow] = useState(false);
    const [item, setItem] = useState([]); // Set initial value to null

    // Toast functions
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            navigate("./signup");
        }

        // Fetch all posts
    //     fetch("/allposts", {
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("jwt"),
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((result) => {
    //             setData(result);
    //         })
    //         .catch((err) => console.log(err));
    // }, [navigate]);

    fetch("/allposts", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
    })
        .then((res) => {
            if (!res.ok) {
                // If response is not OK, throw an error with the status
                throw new Error(`Network response was not ok. Status: ${res.status}`);
            }
            // Attempt to parse JSON, if it fails catch in the next `.catch()`
            return res.json();
        })
        .then((result) => {
            setData(result);
        })
        .catch((err) => {
            console.error("Fetch error or response is not JSON:", err);
        });
    }, [navigate]);
    


    // Toggle comments visibility for a post
    const toggleComment = (post) => {
        if (show) {
            setShow(false);
            setItem(null); // Hide the comment section by resetting the post item
        } else {
            setItem(post); // Set the post to show comments for
            setShow(true);

        }
    };

    // Like a post
    const likePost = (id) => {
        fetch("/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((post) => {
                    if (post._id === result._id) {
                        return result;
                    } else {
                        return post;
                    }
                });
                setData(newData);
            });
    };

    // Unlike a post
    const unlikePost = (id) => {
        fetch("/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((post) => {
                    if (post._id === result._id) {
                        return result;
                    } else {
                        return post;
                    }
                });
                setData(newData);
            });
    };

    //to  Make a comment
    const makeComment = (text, id) => {
        // console.log(comment);

        fetch("/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                text: text,
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((post) => {
                    if (post._id == result._id) {
                        return { ...result,
                        postedBy:{
                            ...post.postedBy,
                        },
                        }
                    } else {
                        return post;
                    }
                });
                setComment("");
                setData(newData);
                notifyB("comment posted")
                console.log(result);

            });


        //     method: "put",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer " + localStorage.getItem("jwt"),
        //     },
        //     body: JSON.stringify({
        //         text: text,
        //         postId: postId,
        //     }),
        // })
        //     .then((res) => {
        //         if (!res.ok) {
        //             console.error("Failed to post comment:", res.status);
        //             return res.json().then((err) => {
        //                 console.error("Error:", err);
        //                 throw new Error(err.message);
        //             });
        //         }
        //         return res.json();
        //     })
        //     .then((result) => {
        //         console.log("Comment posted:", result);
        //         const newData = data.map((post) => {
        //             if (post._id === result._id) {
        //                 return result; // Return the updated post
        //             }
        //             return post;
        //         });
        //         setData(newData); // Update the state to reflect the new comment
        //         setComment(""); // Reset comment input

        //         // Keep the currently shown post intact
        //         if (item && item._id === postId) {
        //             setItem((prevItem) => ({
        //                 ...prevItem,
        //                 comments: result.comments // Update the comments of the shown post
        //             }));
        //         }
        //     })
        //     .catch((err) => {
        //         console.error("Error posting comment:", err);
        //     });
    };

    return (
        <div className="homepapa">
            {data.map((post) => {
                return (
                    <div className="home" key={post._id}>
                        {/* Card */}
                        <div className="card">
                            {/* Card header */}
                            <div className="card-header">
                                <div className="card-pic">
                                    <img className='img1'
                                        src={post.postedBy.photo ? post.postedBy.photo : piclink}
                                        alt="Profile" />
                                </div>
                                <h3>
                                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${post.postedBy._id}`}>
                                        {post.postedBy.name}
                                    </Link>
                                </h3>
                            </div>

                            {/* Card image */}
                            <div className="card-image">
                                <img src={post.photo} alt="Post"
                                />
                            </div>

                            {/* Card content */}
                            <div className="card-content">
                                {post.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ? (
                                    <span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => { unlikePost(post._id) }}>
                                        favorite
                                    </span>
                                ) : (
                                    <span className="material-symbols-outlined" onClick={() => { likePost(post._id) }}>
                                        favorite
                                    </span>
                                )}
                                <p>{post.likes.length} Likes</p>
                                <p>{post.body}</p>
                                <p
                                    style={{ fontWeight: "bold", cursor: "pointer" }}
                                    onClick={() => toggleComment(post)}
                                >
                                    View all comments
                                </p>
                            </div>

                            {/* Comment input */}
                            <div className="add-comment">
                                <MdMood />
                                <input className='inp' type="text" placeholder='Add a Comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                                <button className='comment' onClick={() => makeComment(comment, post._id)}> Post </button>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Show comments modal */}
            {show && item && (
                <div className="showComment">
                    <div className="container">
                        <div className="postPic">
                            <img src={item.photo} alt="Post" />
                        </div>
                        {/* ................................... */}
                        <div className="details">
                            {/* Card header */}
                            <div className="card-header" style={{ borderBottom: "1px solid #00000029" }} >
                                <div className="card-pic">
                                    <img
                                        src={item.postedBy.photo ? item.postedBy.photo : piclink}
                                        alt="" />
                                </div>
                                <h3>{item.postedBy.name} </h3>
                            </div>

                            {/* Comment section */}

                            {/* <div className="comment-section"style={{ borderBottom: "1px solid #00000029" }}> */}
                            {/* ................ */}
                            {/* {item.comments.map((comment) => {
                                    <p className='comm' key={comment._id}>
                                        <span className='commenter' style={{ fontWeight: "bolder" }}>{item.postedBy.name} </span>
                                        <span className='commentText'>{comment.text} pic </span>
                                    </p>
                                })} */}

                            {/* // </div> */}

                            <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
                                {item.comments.map((comment) => {
                                    return (
                                        <p className='comm' key={comment._id}>
                                            <span className='commenter' style={{ fontWeight: "bolder" }}>{comment.postedBy.name} </span>
                                            <span className='commentText'>{comment.comment} </span>
                                        </p>
                                    );
                                })}
                            </div>


                            {/* card content */}
                            <div className="card-content">
                                <p>{item.likes.length} Likes</p>
                                <p>{item.body}</p>
                            </div>

                            {/* Add comment */}
                            <div className="add-comment">
                                <MdMood />
                                <input type="text" placeholder='Add a Comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                                <button className='comment'
                                onClick={() =>{ makeComment(comment, item._id);
                                    toggleComment();
                                }}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="close-comment" onClick={() => setShow(false)}>
                        <span className='material-symbols-outlined material-symbols-outlined-comment'>close</span>
                    </div>
                </div>
            )}
        </div >
    );
}

export default Home;





