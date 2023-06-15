const mongoose = require("mongoose")


const blogSchema = mongoose.Schema({
    title : String,
    content :String,
    category : String,
    date : String,
    likes : Number,
    comments : Array,
    UserName : String,
    UserID : String
})

const BlogModel = mongoose.model("blogs", blogSchema)

module.exports = BlogModel