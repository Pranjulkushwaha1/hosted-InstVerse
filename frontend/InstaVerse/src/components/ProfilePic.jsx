// import React, { useState, useEffect, useRef } from "react";
// import './ProfilePic.css';

// function ProfilePic({ changeprofile }) {
//   var piclink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
//   const [image, setImage] = useState("");
//   const [url, setUrl] = useState("");
//   const hiddenFileInput = useRef(null);

//   // Function to handle file upload to Cloudinary
//   const postDetails = () => {
//     const data = new FormData();
//     data.append("file", image);
//     data.append("upload_preset", "insta-clone");
//     data.append("cloud_name", "pranjulcloud");

//     fetch("https://api.cloudinary.com/v1_1/pranjulcloud/image/upload", {
//       method: "post",
//       body: data
//     })
//       .then((res) => res.json())
//       .then((data) => setUrl(data.url))
//       .catch((err) => console.log(err));
//     console.log(url);
//   };
//   // ..............................................................................
//   const postPic = () => {
//     // saving post to mongodb url cloudinry image
//     fetch("http://localhost:5000/uploadProfilePic", {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + localStorage.getItem("jwt")
//       },
//       body: JSON.stringify({
//         pic: url
//       })
//     }).then(res => res.json())
//       .then(data => {
//         console.log(data)
//         changeprofile();
//         window.location.reload();
//       })
//       .catch(err => console.log(err))
//   }
//   // Handle file input click.......................................................
//   const handleClick = () => {
//     hiddenFileInput.current.click();
//   };

//   // Effect to post image when it is selected.......................................
//   useEffect(() => {
//     if (image) {
//       postDetails();
//     }
//   }, [image]);
//   //postpic to run using useffect.....................................................
//   useEffect(() => {
//     if (url) {
//       postPic();
//     }
//   })
//   // ...................................................................................
//   return (
//     <div className="profilepic darkBg">
//       <div className="changePic centered">
//         <div>
//           <h1>Change profile photo</h1>
//         </div>
//         <div style={{ borderTop: "1px solid #00000030" }}>
//           <button className="upload-btn" style={{ color: "#1EA1F7" }} onClick={handleClick}>
//             Upload photo
//           </button>
//           <input
//             type="file"
//             ref={hiddenFileInput}
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </div>
//         <div style={{ borderTop: "1px solid #00000030" }}>
//           <button className="upload-btn" style={{ color: "#ED4956" }}
//           onClick={()=>{
//             setUrl(null)
//             postPic();
//           }}
//           >Remove Current Photo</button>
//         </div>
//         <div style={{ borderTop: "1px solid #00000030" }}>
//           <button
//             style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px" }}
//             onClick={changeprofile}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfilePic;

import React, { useState, useEffect, useRef } from "react";
import './ProfilePic.css';

function ProfilePic({ changeprofile }) {
  var piclink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const hiddenFileInput = useRef(null);

  // Function to handle file upload to Cloudinary
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "pranjulcloud");

    fetch("https://api.cloudinary.com/v1_1/pranjulcloud/image/upload", {
      method: "post",
      body: data
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  // Function to post the new profile picture to MongoDB
  const postPic = () => {
    fetch("/uploadProfilePic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        pic: url || piclink  // Use a default picture if URL is null
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      changeprofile();  // Close the modal
      window.location.reload();  // Refresh the page to show updated pic
    })
    .catch(err => console.log(err));
  };

  // Handle file input click
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  // Effect to post image when it is selected
  useEffect(() => {
    if (image) {
      postDetails();
    }
  }, [image]);

  // Effect to post the new profile picture when URL changes
  useEffect(() => {
    if (url) {
      postPic();
    }
  }, [url]);

  // Function to remove the current profile picture
  const removePhoto = () => {
    setUrl(piclink);  // Set URL to default profile picture
  };

  return (
    <div className="profilepic darkBg">
      <div className="changePic centered">
        <div>
          <h1>Change profile photo</h1>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button className="upload-btn" style={{ color: "#1EA1F7" }} onClick={handleClick}>
            Upload photo
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button className="upload-btn" style={{ color: "#ED4956" }} onClick={removePhoto}>
            Remove Current Photo
          </button>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px" }}
            onClick={changeprofile}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePic;
 
