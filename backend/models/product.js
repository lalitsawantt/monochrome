const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
const productSchema = mongoose.Schema({
  name:{
    type:String,
    trim:true,
    required:true,
    maxlength:32
  },
  description:{
    type:String,
    maxlength:1000,
  },
  price:{
    type:Number,
    required:true
  },
  category:{
    type:ObjectId,
    ref:"Category",
    required:true
  },
  stock:{
    type:Number,
  },
  sold:{
    type:Number,
    default:0
  },
  photo:{
    data:Buffer,
    contentType:String
  },
  dimension:{
    type:String,
    required:true
  }
},{timestamps:true})

module.exports = mongoose.model("Product", productSchema);