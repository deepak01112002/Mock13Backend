const express = require("express")
const BlogModel = require("../Model/blog.modal")
const auth = require("../Middleware/auth.middleware")
const jwt = require("jsonwebtoken")
const BlogRoute = express.Router()

BlogRoute.post("/blogs",async(req,res)=>{
    // res.send(req.body)
    try {
        let data = new BlogModel(req.body)
        await data.save()
        res.send({"msg" : "Blog is Successfully Posted"})
    } catch (error) {
        res.send({"msg" : "error is "+error})
    }
})

BlogRoute.get("/blogs",async(req,res)=>{
    
    try {
        let data = await BlogModel.find()
        res.send({"data" : data})
    } catch (error) {
        res.send({"msg" : "error is " + error})
    }
})

BlogRoute.patch("/blogs/:id",async(req,res)=>{
    const {UserName,UserID} = req.body
    const {id} = req.params
    try {
        await BlogModel.findOneAndUpdate({_id : id,UserID,UserName},{...req.body})
        res.send({"msg" : "Update Successfully"})
    } catch (error) {
        res.send({"msg" : "error is " + error})
    }
})

BlogRoute.delete("/blogs/:id",async(req,res)=>{
    const {id} = req.params
    const {UserName,UserID} = req.body
    try {
        await BlogModel.findOneAndDelete({_id : id,UserName,UserID})
        res.send({'msg' : "Blog Deleted Successfully"})
    } catch (error) {
        res.send({"msg" : "error is " + error})
    }
})

BlogRoute.patch("/blogs/:id/like",async(req,res)=>{
    const {id} =req.params
    const {UserName,UserID} = req.body
    try {
        let data = await BlogModel.find({_id : id,UserName,UserID})
        // res.send(data)
        if(data.length>0){
            await BlogModel.findOneAndUpdate({_id : id},{"likes" : data[0].likes+1})
            res.send({"msg" : "Like Updated"})
        }else{
            res.send({"msg" : "You are not eligible"})
        }
    } catch (error) {
        res.send({"msg" : "error is " + error})
    }
})

BlogRoute.patch("/blogs/:id/comment",async(req,res)=>{
    const {id} = req.params
    const {UserName,UserID} = req.body
    try {
        let data = await BlogModel.find({_id : id,UserName,UserID})
        if(data.length>0){
          await BlogModel.findOneAndUpdate({_id : id},{$push : {"comments" :{"username" : UserName,"content" : req.body}}})
          res.send({"msg" : "Comment Added"})
        }else{
            res.send({"msg" : "You are not eligible"})
        }
    } catch (error) {
        res.send({"msg" : "error is " + error})
    }
})

module.exports = BlogRoute