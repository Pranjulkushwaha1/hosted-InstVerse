import React, { useContext } from 'react';
import "./Navbar.css"
import { Link } from 'react-router-dom';
import { LoginContext1 } from '../context/LoginContext1';
import { useNavigate } from 'react-router-dom';

function Navbar({ login }) {
  const navigate = useNavigate();
  const { setModelOpen } = useContext(LoginContext1)

  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/" className='ppp'></Link>
          <Link to="/profile" className='ppp'>Profile</Link>
          <Link to="/createPost" className='ppp'>Create Post</Link>
          <Link style={{ textDecoration: "none" }} className='ppp' to="/myfollowingpost">My following</Link>
          <Link to={""}>
            <button className='primaryBtn' onClick={() => setModelOpen(true)}>Log Out</button>
          </Link>
        </>
      ]
    } else {
      return [
        <>
          <Link to="/signup" className='ppp'>SignUp</Link>
          <Link to="/signin" className='ppp'>Signin</Link>
        </>
      ]
    }
  };

  // mobile me show krne ke lye
  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/" className='ppp'>
            <li><span class="material-symbols-outlined">home</span></li>
          </Link>
          <Link to="/profile" className='ppp'>
            <li><span class="material-symbols-outlined">account_circle</span></li>
          </Link>
          <Link to="/createPost" className='ppp'>
            <li><span class="material-symbols-outlined">add_box </span></li>
          </Link>
          <Link style={{ textDecoration: "none" }} className='ppp' to="/myfollowingpost">
            <li><span class="material-symbols-outlined">explore</span></li>
          </Link>
          <Link to={""}>
            <li onClick={() => setModelOpen(true)}>
              <span class="material-symbols-outlined">logout</span></li>
          </Link>
        </>
      ]
    } else {
      return [
        <>
          <Link to="/signup" className='ppp'>SignUp</Link>
          <Link to="/signin" className='ppp'>Signin</Link>
        </>
      ]
    }
  }
  return (
    <>
      <div className='navbar'>
        <h1 onClick={() => { navigate("/") }} style={{ cursor: "pointer" }} id='insta-logo'>InstaVerse</h1>
        <ul className='nav-menu'>{loginStatus()}</ul>
        <ul className='nav-mobile'>{loginStatusMobile()}</ul>
      </div>
    </>
  );
}

export default Navbar