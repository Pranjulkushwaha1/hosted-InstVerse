import React, { useState,useEffect } from 'react';
import './Createpost.css';
// notification ke liye
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// /// //// /// ///////// ////////// ////////////////////
function Createpost() {
const [body, setBody] = useState("");
const [image, setImage] = useState("");
const [url, setUrl] = useState("");

const navigate =useNavigate()
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    !!!!!!!!!!!!!!!! !!!!!!!!!!!

  /* Toast function */
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)



// useeffect use kr rhe h
useEffect(()=>{
  // saving post to mongodb url cloudinry image
  if(url){
  fetch("/createPost",{
    method:"post",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      body,
      pic: url
    })
  }).then(res=>res.json())
  .then(data=>{if(data.error){
    notifyA(data.error)
  }else{
    notifyB("Successfully Posted")
    navigate('/')
  }
})
  .catch(err=>console.log(err)) 
}
}, [url])

// posting image to cloudinary
const postDetails = ()=>{
  console.log(body,image)
  const data = new FormData()
  data.append("file", image)
  data.append("text", body)
  data.append("upload_preset","insta-clone")
  data.append("cloud_name","pranjulcloud")
  fetch("https://api.cloudinary.com/v1_1/pranjulcloud/image/upload",{
    method: "post",
    body: data
  }).then(res => res.json())
  .then(data => setUrl(data.url))
  .catch(err => console.log(err))
}
  // file load and preview  /// //// ///// //// ///// ///// ////
  const loadfile = (event) =>{
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function(){
      URL.revokeObjectURL(output.src)//free memory
    };
  };
  // /// //// //// ///// //// //// ///// //// /////  //// //// ///
  return (
    <>
      <div className="createpost">
        <div className="post-header">
          <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
          <button id='post-btn' onClick={()=>{postDetails()}}>Share</button>
        </div>
        {/* file choose krne ke liye */}
        <div className="main-div">
          <img id='output' src='https://cdn-icons-png.flaticon.com/128/44/44289.png' />
          <input 
          type="file"
          accept='image/*' 
          onChange={(event)=>{
          loadfile(event)
          setImage(event.target.files[0])
        }} 
          />

          {/* Image preview */}
          {/* <input type="file" onChange={getFile1} /> */}

          {/* {file && <img src={file} alt="preview"/>}
          <input  type="file" onChange={getFile1} /> */}
        </div>
        {/* details */}
        <div className="details">
          <div className="card-header">
            <div className="card-pic">
              <img className='imgn' src="https://plus.unsplash.com/premium_photo-1661629259850-9a893425f1f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VtaSUyMG51ZGV8ZW58MHx8MHx8fDA%3D" alt="" />
            </div>
            <h5>Hottest Girl</h5>
          </div>  
          <textarea value={body} onChange={(e)=>{setBody(e.target.value)}} 
         type="text" placeholder='Write a caption'></textarea>
        </div>
      </div>
    </>
  )
}

export default Createpost