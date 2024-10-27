import React, { useEffect, useState } from 'react';
import './Home.css';
import { MdMood, MdYard } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MyFollowingPost() {
  //navigate ke liye
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  // //////////////////////////////////////////////////
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup")
    }
    //fetch all posts
    fetch("/myfollowingpost", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.log(err))
  }, [])
  ///////////////////////////////////////////////////////

  // to show and hide comments
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setItem(posts);
      setShow(true);
    }
  }


  // post like krne ke liye
  const likePost = (id) => {
    console.log(id)
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }
        })
        setData(newData)
        console.log(result)
      })
  }
  // post unlike krne ke liye
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    }).then(res => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        })
        setData(newData);
        setComment("");
        console.log(result);
      })
  }
  // function to make comment
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
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result
          } else {
            return posts
          }
        })
        setData(newData);
        setComment("");
        console.log(result)
      });
  }
  return (
    <>
      <div className="homepapa">
        {data.map((posts) => {
          return (
            <div className="home" key={posts._id} >
              {/* card */}
              <div className="card">
                {/* card header */}
                <div className="card-header">
                  {/* card pic */}
                  <div className="card-pic">
                    <img className='img1' src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                  </div>
                  {/* name likhne ke liye */}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <h3>
                    <Link  style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${posts.postedBy._id}`} >
                      {posts.postedBy.name}
                    </Link>
                  </h3>

                </div>
                {/* card image ke liye */}
                <div className="card-image">
                  <img src={posts.photo} alt="" />
                </div>
                {/* card content likhne ke liye */}
                <div className="card-content">
                  {
                    posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                      ?
                      (<span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => { unlikePost(posts._id) }}>
                        favorite
                      </span>)
                      :
                      (<span className="material-symbols-outlined" onClick={() => { likePost(posts._id) }}>
                        favorite
                      </span>
                      )
                  }
                  <p>{posts.likes.length} Likes</p>
                  <p>{posts.body}</p>
                  <p style={{ fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => { toggleComment(posts) }}>View all comments</p>
                </div>
                {/* comment krne ke liye */}
                <div className="add-comment">
                  <MdMood /><br />
                  <input className='inp' type="text" placeholder='Add a Comment' value={comment} onChange={(e) => { setComment(e.target.value) }} /><br /><br />
                  <button className='comment'
                    onClick={() => {
                      makeComment(comment, posts._id);
                      toggleComment(posts);
                    }}
                  >Post
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {/*  show Comment  */}
        {show && (
          <div className="showComment">
            <div className="container">
              <div className="postPic">
                {/* 47987389469058097895750970956-80 */}
                <img src={item.photo} alt="" />
              </div>
              <div className="details">
                <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
                  {/* card pic */}
                  <div className="card-pic">
                    <img className='img1' src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="ghgh" />
                  </div>
                  {/* name likhne ke liye */}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {/* 9879809090-9090-9-09-09090-9 */}
                  <h3>{item.postedBy.name}</h3>
                </div>

                {/* comment section */}
                <div className="comment-section"
                  style={{ borderBottom: "1px solid #00000029" }}>
                  {item.comments && item.comments.length > 0 ? (
                    item.comments.map((comment) => (
                      <p className='comm' key={comment._id}>
                        <span className='commenter' key={comment._id}
                          style={{ fontWeight: "bolder" }}>
                          {comment.postedBy.name ? comment.postedBy.name : "Anonymous"}
                        </span>
                        <span className='commentText'>{comment.text ? comment.text : "post"} awesome pic </span>
                      </p>
                    ))
                  ) : (
                    <p>no comment available</p>
                  )}
                </div>
                {/* card content likhne ke liye789577859780598908790 */}
                <div className="card-content">
                  <p>{item.likes.length}</p>
                  <p>{item.body}</p>
                  <p style={{ fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => {
                      toggleComment(posts);
                    }}></p>
                </div>
                {/* add comment */}
                <div className="add-comment">
                  <div className="add-comment">
                    <MdMood /><br />
                    <input className='inp' type="text" placeholder='Add a Comment' value={comment} onChange={(e) => { setComment(e.target.value) }} /><br /><br />
                    <button className='comment'
                      onClick={() => { makeComment(comment, item._id) }}
                    >Post</button>
                  </div>
                </div>

              </div>
            </div>
            <div className="close-comment">
              <span className='material-symbols-outlined material-symbols-outlined-comment' onClick={() => { toggleComment(null) }}>close</span>
            </div>
          </div>)
        }
      </div >
    </>
  )
}


export default MyFollowingPost