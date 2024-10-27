import React, { useEffect, useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
// toast container import
import { toast } from 'react-toastify';

function SignUp() {
    // usenaviigate ek page se dusre page me redirect ke liye
    const navigate = useNavigate();
    //create variable
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    //toast function kuch bna lete h 
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    //email check krne ke liye (regex) ka use krte h
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //strong password check krne ke liye (regex)
    const passRegex = /("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")/;

    // // // // // // //

    const postData = () => {
//checking email 
if(!emailRegex.test(email)){ 
    notifyA("Invalid email")
    return//checking pass word
}else if(passRegex.test(password)){
    notifyA("Password must contain at least54 8 characters, with one uppercase, lowercase, number, and special character. Avoid using simple or common words.")
    return
}
        //sending Data to Server
        console.log("ram ram");
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                userName: userName,
                email: email,
                password: password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    notifyA(data.error)
                } else {
                    notifyB(data.message)
                    navigate("/signin")
                }
                console.log(data)
            })
    }


    return (
        <>
            <div className="signUp1">
                <form className="form-container">
                    <h2>InstaVerse</h2>
                    <p className='login-Para'>
                        Sign up to see photos and videos<br />
                        from your friends
                    </p>
                    <div>
                        <input type="email" name='email' id='email' placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                    </div>
                    &nbsp;
                    <div>
                        <input type="text" name='name' id='name' placeholder='Full Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    &nbsp;
                    <div>
                        <input type="text" name='username' id='username' placeholder='Username' value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                    </div>
                    <br />
                    <input type="password" name='password' id='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <p className='login-Para' style={{ fontSize: "13px", margin: "3px 0px" }}>
                        By signing up, agree to out Terms,<br />
                        privacy policy and cookies policy.
                    </p>
                    <input type="submit" id='submit-btn' value="SignUp" onClick={(e) => { e.preventDefault(); postData(); }} />
                    <div className="form2">
                        <p className='p1'>
                            Already have an account?
                            <Link to='/signin'><span style={{ color: "blue", cursor: "pointer" }}>Sign in</span> </Link>
                        </p>
                    </div>
                </form>

            </div>
        </>
    );
}

export default SignUp