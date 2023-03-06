const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")



exports.creatToken=(User)=>{
     const payload={
          "_id":User._id,  
          'email':User.email    
          
     }
    return jwt.sign(payload,process.env.JWT_SECRET,{
          expiresIn:"7d"
     })
}


exports.hashPassword=(password)=>{
     return new Promise ((resolve,reject)=>{
          bcrypt.genSalt(12,(err,salt)=>{
               if(err){reject(err)}
               bcrypt.hash(password,salt,(err,hash)=>{
                    if(err){reject(err)}
                    resolve(hash)
               })
          })
     })
}



exports.comparePassword=(password,hashed)=>{
  return bcrypt.compare(password,hashed)
}




