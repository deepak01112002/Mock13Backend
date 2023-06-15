const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    Username : String,
    Image : String,
    Email : String,
    Password : String
})

const UserModal = mongoose.model("users",userSchema)
module.exports = UserModal