const express=require("express")
const router=express.Router()
 const{isUsers,isAdmin}=require("../middlewares/auth")
const{registerUser,loginUser,Secret,updateProfile}=require("../controllers/user")



//routes.........

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/auth-check",isUsers,Secret)


router.get("/admin-check",isUsers,isAdmin,Secret
)
router.put("/updateProfile",isUsers,updateProfile)


module.exports=router