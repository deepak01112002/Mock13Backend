const express = require("express")
const cors = require("cors")
const connection = require("./db")
const UserRoute = require("./Routes/user.routes")
const auth = require("./Middleware/auth.middleware")
const BlogRoute = require("./Routes/blog.routes")

const app = express()
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("FFFFF")
})

app.use("/api",UserRoute)
app.use("/api",auth,BlogRoute)

app.listen(8080,async()=>{

    try {
        await connection
        console.log("Server is connected")
    } catch (error) {
        console.log({"msg" : error})
    }
   
})