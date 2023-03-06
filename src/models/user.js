const mongoose=require("mongoose")
const {Schema}=mongoose

const userSchema= Schema({
     name:{
          type:String,
          trim:true,
          required:true
     },
     email:{
          type:String,
          trim:true,
          required:true,
          unique:true
     },
     number:{
          type:String,
          trim:true,
          minLength:11,
          maxLength:11,
          required:true,
          unique:true
     },
     password:{
          type:String,
          required:true,
          min:6,
          max:64
     },

     address:{
          type:String,
          trim:true,
     },
     role:{
          type:Number,
          default:0
     }
},{timestamps:true,versionKey:false})

const user=mongoose.model("users",userSchema)

module.exports=user