const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
  product:{
    type:ObjectId,
    ref:"Product"
  },
  name:String,
  count:Number,
  price:Number
})

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);
const orderSchema = mongoose.Schema({
  products:[ProductCartSchema],
  transaction_id:{},
  amount:{
    type:Number,
    required:true
  },
  address:{
    type:String,
    maxlength:1000,
  },
  status:{
    type:String,
    default:"Received",
    enum:["Received","Delivered","Cancelled","Dispatched"]
  },
  updated:Date,
  user:{
    type:ObjectId,
    ref:"User"
  }
}, {timestamps:true})

const Order = mongoose.model("Order",orderSchema);

module.exports = {Order, ProductCart};