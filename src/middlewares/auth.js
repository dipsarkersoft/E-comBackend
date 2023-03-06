const jwt=require("jsonwebtoken")
const user=require("../models/user")





exports.isUsers=async(req,res,next)=>{
     
     try{
          const decoded=jwt.verify(
               req.headers.authorization,
               process.env.JWT_SECRET)

            req.User=decoded
            next()   
     }

     catch(error){
          return res.status(401).json(error)
     }
}

exports.isAdmin=async(req,res,next)=>{
     try{
          const User=await user.findById(req.User._id)
          if(User.role !==1){
               return res.status(401).json("You are not admin")

          }
          else{
               next()
          }
     }
     catch(error){
          console.log(error)
     }
}