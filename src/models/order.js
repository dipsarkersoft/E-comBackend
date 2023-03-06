const mongoose=require("mongoose")

const orderSchema=mongoose.Schema(
  {
         products: [
             {
                type: mongoose.ObjectId,
                ref: "product",
              },
            ],
            payment: {},
            buyer: {
              type: mongoose.ObjectId,
              ref: "user",
            },
          status: {
              type: String,
             default: "Not Process",
             enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
            },
          }, {timestamps: true,versionKey:false }

)

const order=mongoose.model("order",orderSchema)

module.exports=order    