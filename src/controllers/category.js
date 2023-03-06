const category=require("../models/category")
const slugify=require("slugify")



exports.create=async(req,res)=>{
     try{
          const {name}=req.body
          if(!name.trim())
          {
               return res.json({erro:"Name is required"})
          }

          const existingCategory=await category.findOne({name})
          if(existingCategory){
               return res.json({error:"Already exists"})
          }
          const Category=await new category({name,slug:slugify(name)}).save()
          res.json(Category)
     }
     catch(error){
          return res.status(400).json(error)
     }
}


exports.update=async(req,res)=>{
     try{
          const{name}=req.body
          const{categoryId}=req.params
          const Category=await category.findByIdAndUpdate(
               categoryId,{
                    name,slug:slugify(name)
               },{new:true})
               res.json(Category)
     }
     catch(error){
          return res.status(400).json(error.message)
     }
}

exports.remove=async(req,res)=>{
     try{
          const removed=await category.findByIdAndDelete(req.params.categoryId)
          res.json("Category delete sucess")
     }
     catch(error){
          return res.status(400).json(error.message)
     }
}

exports.list=async(req,res)=>{
     try{
          const all =await category.find({})
          res.json(all)
     }
     catch(error){
          return res.status(400).json(err.message);
     }
}
exports.read=async(req,res)=>{
     try{
          const Category=await category.findOne({slug:req.params.slug})
         res.json(Category)
     }
     catch(error){
          return res.status(400).json(error.message)
     }
}