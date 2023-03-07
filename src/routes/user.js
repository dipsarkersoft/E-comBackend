const express=require("express")
const router=express.Router()
 const{isUsers,isAdmin}=require("../middlewares/auth")
const{registerUser,loginUser,Secret,updateProfile, orderStatusController, getAllOrdersController, getOrdersController}=require("../controllers/user")



//routes.........

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/auth-check",isUsers,Secret)


router.get("/admin-check",isUsers,isAdmin,Secret
)
router.put("/updateProfile",isUsers,updateProfile)

router.get("/orders", isUsers, getOrdersController);

//all orders
router.get("/all-orders", isUsers, isAdmin, getAllOrdersController);

// order status update
router.put("/order-status/:orderId",isUsers,isAdmin,orderStatusController
);

module.exports=router