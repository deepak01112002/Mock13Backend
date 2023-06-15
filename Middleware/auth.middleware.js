const jwt = require("jsonwebtoken")
const auth = (req,res,next)=>{
   let token = req.headers.authorization.split(" ")[1]
   if(token){
     let decoded = jwt.verify(token,"deepakpandey")
      req.body.UserName = decoded.username
      req.body.UserID = decoded.userID
      next()
   }else{
      res.send({"msg" : "Login First"})
   }
}

module.exports = auth