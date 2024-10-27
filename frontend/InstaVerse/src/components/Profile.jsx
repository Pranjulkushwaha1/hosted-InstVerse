// import React, { useState, useEffect } from 'react'
// import './Profile.css'
// import PostDetail from './PostDetail';
// import ProfilePic from './ProfilePic';
// function Profile() {

//   ////////////////////////////////////////.....................................
//   const [pic, setPic] = useState([]);
//   const [show, setShow] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [user, setUser] = useState(false);
//   const [changePic, setChangePic] = useState(false);

//   // to show and hide........................................................
//   // to show and hide..........................................................
//   //   const toggleDetails =(posts)=>{
//   //     if(show){
//   //       setShow(false);
//   //     }else{
//   //       setShow(true);
//   //       setPosts(posts);
//   //     }
//   //   };

//   useEffect(() => {
//     fetch(`http://localhost:5000/user/${userid}`, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("jwt")
//       }
//     })
//       .then(res => res.json())
//       .then((result) => {
//         console.log(result)
//         setUser(result.user)
//         setPosts(result.posts)
//         if (result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id))
//           setIsfollow(true)
//       })
//   }, [isfollow])
//   //profile change krne ke liye...............................................
//   const changeprofile = () => {
//     if (changePic) {
//       setChangePic(false);
//     } else {
//       setChangePic(true);
//     }
//   }


//   useEffect(() => {
//     fetch("http://localhost:5000/myposts", {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("jwt")
//       }
//     })
//       .then(res => res.json())
//       .then((result) => {
//         setPic(result)
//         console.log(pic)
//       })
//   }, [])

//   return (
//     <>
//       <div className="profile">
//         {/* profile frame ...................................................*/}
//         <div className="profile-frame">
//           {/* profile pic ...................................................*/}
//           <div className="profile-pic">
//             <img
//               onClick={changeprofile}
//               className='img11'
//               src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
//           </div>
//           {/* profile data ..................................................*/}
//           <div className="profile-data">
//             <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
//             <div className="profile-info" style={{ display: "flex" }}>
//               <p>{pic ? pic.length : "0"} posts</p>
//               <p>{user.followers ? user.followers.length : "0"} followers</p>
//               <p>40 following</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <hr style={{ widows: "90%", opacity: "0.9" }} />
//       {/* profile gallery ....................................................*/}
//       <div className="gallery">
//         {pic.map((pics) => {
//           return <img key={pics._id} src={pics.photo} onClick={() => {
//             toggleDetails(pics)
//           }} className='item' ></img>
//         })}
//       </div>
//       {show &&
//         <PostDetail item={posts} toggleDetails={toggleDetails} />
//       }
//       {
//         changePic &&
//         <ProfilePic changeprofile={changeprofile} />
//       }
//     </>
//   )
// }

// export default Profile

import React, { useState, useEffect } from 'react';
import './Profile.css';
import PostDetail from './PostDetail';
import ProfilePic from './ProfilePic';

function Profile() {
  var piclink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [pic, setPic] = useState([]); // Store user's posts
  const [show, setShow] = useState(false); // Toggle for post details
  const [posts, setPosts] = useState([]); // Post details for clicked post
  const [user, setUser] = useState({}); // Store user data
  const [changePic, setChangePic] = useState(false); // Toggle for profile pic change
  const [isfollow, setIsfollow] = useState(false); // Follow status
  const [loading, setLoading] = useState(true); // Loading state for data

  const userid = JSON.parse(localStorage.getItem("user"))._id; // Assuming you get the user ID from localStorage

  // Fetch user profile data
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        setUser(result.user);
        setPosts(result.posts);
        if (result.user.followers.includes(userid)) setIsfollow(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        setLoading(false);
      });
  }, [isfollow, userid]);

  // Profile picture change toggle
  const changeprofile = () => {
    setChangePic(!changePic);
  };

  // Fetch user posts
  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then((result) => {
        setPic(result);
      })
      .catch(err => console.error("Failed to fetch posts:", err));
  }, []);

  // Toggle post details
  const toggleDetails = (post) => {
    setShow(!show);
    setPosts(post);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="profile">
        {/* profile frame */}
        <div className="profile-frame">
          {/* profile pic */}
          <div className="profile-pic">
            <img
              onClick={changeprofile}
              className='img11'
              src={user.photo ? user.photo : piclink} // Use user's profile pic or a default
              alt="Profile"
            />
          </div>
          {/* profile data */}
          <div className="profile-data">
            <h1>{user.name || "User"}</h1>
            <div className="profile-info" style={{ display: "flex" }}>
              <p>{pic.length} posts</p>
              <p>{user.followers ? user.followers.length : "0"} followers</p>
              <p>{user.following ? user.following.length : "0"} following</p>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ width: "90%", opacity: "0.9" }} />
      {/* profile gallery */}
      <div className="gallery">
        
        {pic.map((pics) => (
          <div className='imageBox'>
          <img
            key={pics._id}
            src={pics.photo}
            onClick={() => toggleDetails(pics)}
            className='item'
            alt="User Post"
          />
          <p>{pics.likes.length} likes</p>
          </div>
        ))}
      </div>
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {changePic && <ProfilePic changeprofile={changeprofile} />}
    </>
  );
}

export default Profile;





