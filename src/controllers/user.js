 const user=require("../models/user")
const{hashPassword,comparePassword, creatToken}=require("../helpers/auth")


 exports.registerUser=async(req,res)=>{
    
    
     try{
     
          const{name,email,password,number}=req.body
           
          if(!name.trim()){
               return res.json({error:"Name is required"})
          }
          if(!email){
               return res.json({error:"email is required"})
          }
          if(!number){
               return res.json({error:"number is required"})
          }
          
          if(!password || password.length<6){
               return res.json({error:"Password must be at least 6 charecters"})

          }


          const emailExists=await user.findOne({email})
          if(emailExists){
               return res.json({error:"Email already exists"})
          }
     
          
          const hashedPassword=await hashPassword(password)
          
          const User= await new user({
               name,email,number,password:hashedPassword,
          }).save()

          
     const token=creatToken(User)

          res.json({
               User:{
                    name:User.name,
                    email:User.email,
                    number:User.number,
                    role:User.role,
                    address:User.address
               },token
          })
     }
 catch(error){
          res.status (400).json({
               message:error
          })
     }
 }


 exports.loginUser=async(req,res)=>{
     try{
         
          const{email,password}=req.body

          if(!email){
               return res.json({error:"Password must be at least 6 Charecters"}
               )
          }
          const User=await user.findOne({email})
          if(!User){
               return res.json({error:"User not found"})

          }

          //4..compare Password.....

          const matchPass=await comparePassword(password,User.password) 
          if(!matchPass){
               return res.json({error:"Wrong Pass"})
          }
          const token=creatToken(User)
          res.json({
               User:{
                    name:User.name,
                    email:User.email,
                    role:User.role

               },token
          })
     }

     catch(error){console.log(error)}
 }


 exports.Secret=async(req,res)=>{
     res.json({ok:true,
          currentUser:req.User})
 }

 exports.updateProfile=async(req,res)=>{
     try{

          

          const {name,number,address}=req.body
          
          const id=req.User._id     
          const updateData=await user.updateOne({id},
          {name,number,address})

          const User = await user.findOne({id});

      res.json(User)
         
     }

     catch(error){console.log(error)}
 }

 