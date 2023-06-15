const express = require("express")
const UserModal = require("../Model/user.model")
const bcrypt =  require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../Middleware/auth.middleware")
const UserRoute = express.Router()

UserRoute.post("/register",(req,res)=>{
    const {Password} = req.body
   try {
    bcrypt.hash(Password,5,async(err,hash)=>{
        let data = new UserModal({...req.body,Password : hash})
        await data.save()
        res.send({"msg" : "Register Successfully"})
    })
   
   } catch (error) {
      res.send({"msg" : error})
   }
})

UserRoute.post("/login",async (req,res)=>{
    const {Password,Email} = req.body
    try {
        let data = await UserModal.find({Email:Email})
        if(data.length>0){
         bcrypt.compare(Password,data[0].Password,(err,result)=>{
            if(err){
                res.send({"msg" : "wrong Credentials"})
            }else{
               let token = jwt.sign({userID : data[0]._id,username : data[0].Username},"deepakpandey")
               res.send({"msg" : "Login Successfull", "token" : token})
            }
         })
        }
    } catch (error) {
        res.send({"msg" : error})
    }
})



module.exports = UserRoute