import { useState } from 'react'
import React,{createContext} from 'react';
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Signin from './components/Signin';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
//toastify container ke liye
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './components/Createpost';
// global variable
import { LoginContext1 } from './context/LoginContext1.jsx';
import LogModal from './components/LogModal.jsx';
import UserProfile from './components/UserProfile.jsx';
import MyFollowingPost from './components/MyFollowingPost.jsx';

function App() {
const [userLogin, setUserLogin] = useState(false);

// logout popup open krne ke liye
const [modalOpen, setModelOpen] = useState(false); 

  return (
    <>
      <BrowserRouter>
        <div className='app'>
          <LoginContext1.Provider value={{setUserLogin, setModelOpen}} > 
          <Navbar login={userLogin} />
          <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/signup' element={<SignUp />} ></Route>
            <Route path='/signin' element={<Signin />} ></Route>
            <Route exact path='/profile' element={<Profile />} ></Route>
            <Route path='/createPost' element={<Createpost />} />
            <Route path="/profile/:userid" element={<UserProfile />} ></Route>
            <Route path='/myfollowingpost' element={<MyFollowingPost />}></Route>
          </Routes>
          <ToastContainer theme='dark' />
            {modalOpen && <LogModal setModelOpen={setModelOpen}></LogModal>}

          </LoginContext1.Provider>
        
        </div>
      </BrowserRouter>

    </>
  )
}

export default App
