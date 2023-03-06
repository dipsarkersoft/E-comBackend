
const express =require("express");
const { create, read,photo, deleteProduct,updateProduct, productsCount, 
     listProducts, productsSearch, relatedProducts, filteredProducts, readAllProducts, processPayment, getToken}
      = require("../controllers/product.js");
const formidable=require("express-formidable")
const router = express.Router();

// middlewares
const { isUsers, isAdmin } =require("../middlewares/auth.js");

router.post("/product", isUsers, isAdmin,formidable(), create);

router.get("/readAllProducts",readAllProducts);

router.get("/readproduct/:id",read);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updateProduct/:id",formidable(), updateProduct);
router.get("/photo/:id",photo)
router.get("/totalproduct", productsCount)
router.get("/listProducts/:page", listProducts)
router.get("/productsSearch/:keyword", productsSearch)
router.get("/relatedProducts/:productId/:categoryId",relatedProducts)
router.post("/filteredProducts", filteredProducts)


router.get("/braintree/token", getToken);
router.post("/braintree/payment", isUsers, processPayment);
//router.put("/order-status/:orderId", isUsers, isAdmin, orderStatus)

module.exports=router;