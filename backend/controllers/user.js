const User = require("../models/user");
const Order = require("../models/order");


exports.getUserById = (req,res,next,id) => {
  User.findById(id).exec((err, user) => {
    if(err){
      return res.status(400).json({
        error:"Error while searching for user"
      })
    }
    if(!user){
      return res.status(404).json({
        error:"User not found"
      })
    }
    // Adding the user profile to the request
    req.profile = user;
    next();
  })
}

exports.getUser = (req, res) => {
  // TODO: get back here for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile)
}

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate({_id:req.profile._id}, {$set: req.body}, {new: true, userFindAndModify:false}, (err, user) => {
    if(err){
      return res.status(400).json({
        error:"Unable to update the user info"
      })
    }
    if(!user){
      return res.status(404).json({
        error:"User not found"
      })
    }
    user.salt = undefined;
    user.encry_password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    return res.status(200).json(user);
  })

}

exports.userPurchaseList = (req, res) => {
  Order.find({user:req.profile._id})
  .populate("user","_id name")
  .exec((err, order) => {
    if(err){
      return res.status(400).json({
        error:"Something went wrong with fetching orders"
      })
    }
    if(!order){
      return res.status(404).json({
        error:"No orders found"
      })
    }
    return res.json(order);
  })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name:product.name,
      description:product.description,
      category:product.category,
      quantity:product.quantity,
      amount:req.body.order.amount,
      transaction_id:req.body.order.transaction_id
    })
  })
  User.findOneAndUpdate({_id:req.profile._id}, {$push:{purchases:purchases}},{new:true},(err, purchaseList) => {
    if(err){
      return res.status(400).json({
        error:"Unabled to save purchase list"
      })
    }
    next();
  })
  // next(); 
}