const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../keys');
const mongoose = require('mongoose');
const USER = mongoose.model("USER")

module.exports = (req, res, next) =>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: "you must have  logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify( token, jwt_secret ,(err, payload)=>{
        if(err){
            return res.status(401).json({error:"yoou must have log in"})
        }
        const {_id} = payload
        USER.findById(_id).then(userData=>{
            console.log(userData) 
            req.user = userData
            next()
        }) 
    })
    //  console.log("middle auth")//  
}
// string  token

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY0MTk0NjExNTkyYWY3ZjcxNWMyYzgiLCJpYXQiOjE3MjcyNzQzMTd9.dnBSQlJFmo1jyaKxI0N_gGCBoL5bU4hPsPl8UT2zmCk"