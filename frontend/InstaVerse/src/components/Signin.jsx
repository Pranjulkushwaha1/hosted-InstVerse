import React, { useState,useContext } from 'react';
import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext1 } from '../context/LoginContext1';
function Signin() {

    const {setUserLogin} = useContext(LoginContext1)

    //navigate krne ke liye
    const navigate = useNavigate();
    //email and pass word ke liye variable create kr rhe h
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //toast function
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //post data function
    //post data function 
    const postData = () => {
        //email check krne ke liye
        if (!emailRegex.test(email)) {
            notifyA("Invalid email")
        }
        //Sending data to server
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    notifyA(data.error)
                } else {
                    notifyB("Signed In Successfully")
                    console.log(data)
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    setUserLogin(true)
                    navigate("/")  
                }
            })
    }

    return (
        <>
            <div className="signUp2">
                <form className="form-container1">
                    <div className='www'>
                        <h2>InstaVerse</h2>
                        <input type="email" name='email' id='email' placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    &nbsp;
                    <br />
                    <input type="password" name='password' id='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />
                    &nbsp;
                    <br />
                    <input type="submit" id='submit-btn' value="Sign in" onClick={(e)=>{e.preventDefault();postData();}} />
                    <div className="form2">
                        <p className='p1'>
                            Don't have an account?
                            <Link to='/signup'><span style={{ color: "blue", cursor: "pointer", textDecoration: "none" }}>Sign Up</span> </Link>
                        </p>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Signin
