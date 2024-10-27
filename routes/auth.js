const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const USER = mongoose.model("USER");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../keys');
const requirelogin = require('../middlewares/requirelogin');



// router.get('/createPost', requirelogin, (req, res) => {
// console.log("hello auth"); 
// })


router.post("/signup", (req, res) => {
    // res.json("data posted successfully")
    // console.log(req.body.name);
    const { name, userName, email, password } = req.body;
    if (!name || !userName || !email || !password) {
        res.status(400).json({ error: "please add all the the field" })
    }
    USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then((savedUser) => {
        if (savedUser) {
            return res.status(400).json({ error: "User already exist with that email or username" })
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {
            const user = new USER({
                name,
                email,
                userName,
                password: hashedPassword
            })
            user.save()
                .then(user => { res.json({ message: "Registered Successfuly" }) })
                .catch(err => { console.log(err) })
        })
    });
})
//signin krne ke liye route bna rhe h
router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "please add email and password" })
    }//agr glt email and password dala tb
    USER.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(400).json({ error: "Invalid email or password" })
        }//email and password shi tb
        bcrypt.compare(password, savedUser.password).then((match) => {
            if (match) {
                // return res.status(200).json({ message: "Signed in Successfuly" })
                const token = jwt.sign({_id:savedUser.id},jwt_secret)
                const {_id,name,email,userName} = savedUser
                console.log({token,user:{_id,name,email,userName}})
                res.json({token,user:{_id,name,email,userName}})
            } else {
                return res.status(400).json({ error: "Invalid password" },)
            }
        })
            .catch(err => console.log(err)) 
    })
})
module.exports = router
