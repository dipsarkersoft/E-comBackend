const express=require("express")
const router=express.Router()

//middleware
const{isUsers,isAdmin}=require("../middlewares/auth")

const{create,update,remove,list,read}=require("../controllers/category")



router.post("/category",isUsers,isAdmin,create)
router.put("/category/:categoryId", isUsers, isAdmin, update);
router.delete("/category/:categoryId", isUsers, isAdmin, remove);
router.get("/categories", list);
router.get("/category/:slug", read);



module.exports=router