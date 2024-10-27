import React, { useState, useEffect } from 'react'
import './UserProfile.css';
import PostDetail from './PostDetail';
import { useParams } from 'react-router-dom';

function UserProfile() {

    ////////////////////////////////////////.....................................
    var piclink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    const { userid } = useParams();
    const [isfollow, setIsfollow] = useState(false);
    console.log(userid);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({ name: '' })
    //...............................................................................

    ///to follow user ke liye function
    const followUser = (userId) => {
        fetch("/follow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userId
            })
        })
            .then((res) => { res.json() })
            .then((data) => {
                console.log(data)
                setIsfollow(true)
            })
    }

    ///to follw user ke liye function
    const unfollowUser = (userId) => {
        fetch("/unfollow", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setIsfollow(false)
            });
    };

    // to show and hide..........................................................
    //   const toggleDetails =(posts)=>{
    //     if(show){
    //       setShow(false);
    //     }else{
    //       setShow(true);
    //       setPosts(posts);
    //     }
    //   };

    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setUser(result.user)
                setPosts(result.posts)
                if (result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id))
                    setIsfollow(true)
            })
    }, [isfollow])

    return (
        <>
            <div className="profile">
                {/* profile frame.................................. */}
                <div className="profile-frame">
                    {/* profile pic................................... */}
                    <div className="profile-pic">
                        <img className='img11'
                            src={user.photo ? user.photo : piclink}
                            alt="" />
                    </div>
                    {/* profile data .................................*/}
                    <div className="profile-data">
                        <div style={{ display: "flex", alignItems: "center", gap: "86px" }}>
                            <h1>{user.name}</h1>
                            <button className='followbtn' style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
                                onClick={() => {
                                    if (isfollow) {
                                        unfollowUser(user._id);
                                    } else {
                                        followUser(user._id);
                                    }

                                }}
                            >
                                {isfollow ? "unfollow" : "follow"}
                            </button>
                        </div>

                        <div className="profile-info" style={{ display: "flex" }}>
                            <p>{posts.length} post</p>
                            <p>{user.followers ? user.followers.length : "0"} followers</p>
                            <p>{user.following ? user.following.length : "0"} following</p>
                        </div>

                    </div>
                </div>
            </div>
            <hr style={{ widows: "90%", opacity: "0.9" }} />
            {/* profile gallery ...............................................*/}
            <div className="gallery">
                {posts.map((pics) => {
                    return <img key={pics._id} src={pics.photo}
                        //    onClick={() => {
                        //     toggleDetails(pics)
                        //   }} 
                        className='item' ></img>
                })}
            </div>
            {/* {show &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      } */}
        </>
    )
}

export default UserProfile


