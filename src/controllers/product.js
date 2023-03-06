const Product =require("../models/product.js"); 
const fs =require("fs");
const slugify =require("slugify");
const Order=require("../models/order")
const braintree=require("braintree")


exports.create = async (req, res) => {
     try {
     
       const { name, description, price, category, quantity, shipping } =
       req.fields;
       const {photo } = req.files;

       // validation

       switch (true) {
         case !name?.trim():
          return res.status(500).send({ error: "Name is Required" });
         case !description?.trim():
          return res.status(500).send({ error: "Description is Required" });
         case !price?.trim():
          return res.status(500).send({ error: "Price is Required" });
         case !category?.trim():
          return res.status(500).send({ error: "Category is Required" });
         case !quantity?.trim():
          return res.status(500).send({ error: "Quantity is Required" });
         case !shipping?.trim():
          return res.json({ error: "Shipping is required" });
           
        case photo && photo.size > 1000000:
           return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
       }
   
      
     const products = new Product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
   
   const result =await products.save();
    res.status(200).json({
      status:"sucess",
      data:result
  })

  } catch (error) {
    res.status(400).json({
      status:"failed",
      data:error.message
    });
  }
   };



exports.read = async (req, res) => {
  
  try {
  
    const id=req.params.id
    const product = await Product.findOne({_id:id})
    .populate({ path: 'category', model:'category', strictPopulate: false})
    .select("-photo")
    res.status(200).json({
      status:"sucess",
     data: product
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status:"failed"
    
    })
  }
};
exports.readAllProducts= async (req, res) => {
  
  try {
  
    
    const product = await Product.find()
    .populate({ path: 'category', model:'category', strictPopulate: false})
    .select("-photo")
    res.status(200).json({
      status:"sucess",
     data: product
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status:"failed"
    
    })
  }
};




// exports.updateProduct = async (req, res) => {
//   try {
  
//     const { name, description, price, Category, quantity, shipping } =req.fields;
//     const { photo } = req.files;
  
//     switch (true) {
//       case !name?.trim():
//       return  res.json({ error: "Name is required" });
//       case !description?.trim():
//       return  res.json({ error: "Description is required" });
//       case !price?.trim():
//       return  res.json({ error: "Price is required" });
//       case !Category?.trim():
//       return  res.json({ error: "Category is required" });
//       case !quantity?.trim():
//       return  res.json({ error: "Quantity is required" });
//       case !shipping?.trim():
//       return  res.json({ error: "Shipping is required" });
      
//       case photo && photo.size > 1000000:
//         return res
//           .status(500)
//           .send({ error: "photo is Required and should be less then 1mb" })
//     }

//     const products = await Product.findByIdAndUpdate(
//       req.params.pid,
//       { ...req.fields, slug: slugify(name) },
//       { new: true }
//     );
//     if (photo) {
//       products.photo.data = fs.readFileSync(photo.path);
//       products.photo.contentType = photo.type;
//     }

//     await products.save();
//     res.status(200).json({
//       status:"sucess",
//        products
//     });
//    } catch (err) {
//     console.log(err)
  
//       res.status(400).json({
//       status:"failed"
//      });
//    }
// };



exports.updateProduct = async (req, res) => {
  try {
   
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
   
    switch (true) {
      case !name?.trim():
      return  res.json({ error: "Name is required" });
      case !description?.trim():
      return  res.json({ error: "Description is required" });
      case !price?.trim():
      return  res.json({ error: "Price is required" });
      case !category?.trim():
      return  res.json({ error: "Category is required" });
      case !quantity?.trim():
      return  res.json({ error: "Quantity is required" });
      case !shipping?.trim():
      return  res.json({ error: "Shipping is required" });
      case photo && photo.size > 1000000:
      return  res.json({ error: "Image should be less than 1mb in size" });
    }

   

    // update product
    const Products = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      Products.photo.data = fs.readFileSync(photo.path);
      Products.photo.contentType = photo.type;
    }

    
    await Products.save();
    res.status(200).json({
      status:"sucess",
      Products
    });

  } catch (err) {
    
    return res.status(400).json(err.message);
  }
};


exports.productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).json({
      status:"sucess",
     data: total
    });



  } catch (err) {
    res.status(400).json({
      status:"failed"
    
    })
  }
};


exports.filteredProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    
    let args = {};
    if (checked.length > 0) args.category = checked
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    

    const products = await Product.find(args);
    
    res.status(200).json({
      success: true,
      products
    })
  } catch (err) {
    res.status(400).json({
      message:err
     
    })
  }
};

exports.listProducts = async (req, res) => {
  try {
    const perPage = 5;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
       .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

      res.status(200).json({
        status:"sucess",
       data: products
      });
    
  } catch (err) {
    res.status(400).json({
      status:"failed"
     
    });
  }
};

exports.photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select(
      "photo"
    );
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      res.set("Cross-Origin-Resource-Policy", "cross-origin")
      return res.send(product.photo.data);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.productsSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }        
      ],
    })
    res.status(200).json({
      status:"sucess",
     data: results
    })
    
  } catch (err) {
    res.status(400).json({
      status:"failed" 
    })
  }
}


exports.relatedProducts = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    
    const related = await Product.find({
      category: categoryId,
      _id: { $ne: productId },
    })
    .select("-photo")
       .populate({ path: 'category', model:'category', strictPopulate: false})    
      .limit(5);

      res.status(200).json({
        status:"sucess",
       data:related
      });
    } catch (err) {
      console.log(err)
      res.status(400).json({
        status:"failed"
      
      })
   }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status:"sucess",
     message:"Product Deleete Suces"
    });
  } catch (err) {
    res.status(400).json({
      status:"failed"
    
    });
  }
};



var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANTID,
  publicKey: process.env.PUBLICKEY,
  privateKey: process.env.PRIVETKEY
});


exports.getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.processPayment = async (req, res) => {
  try {
    // console.log(req.body);
    const { nonce, cart } = req.body;

    let total = 0;
    [cart].map((i) => {
      total += i.price;
    });
    // console.log("total => ", total);

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.User._id,
          }).save();   
          decrementQuantity(cart);
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

