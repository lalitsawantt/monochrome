const { Order, ProductCart } = require("../models/order")

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
  .populate("products.product", "name price")
  .exec((err, order) => {
    if(err){
      res.status(400).json({
        err:"Could not find the requested order"
      })
    }
    if(!order){
      res.status(404).json({
        err:"No order exists with the provided id"
      })
    }
    req.order = order;
    next();
  })
}

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if(err){
      res.status(400).json({
        err:"Failed to create the order"
      })
    }
    return res.status(200).json(order)
  })
}

exports.getAllOrders = (req, res) => {
  Order.find()
  .populate("user","_id name")
  .exec((err, orders) => {
    if(err){
      return res.status(400).json({
        error:"No orders found"
      })
    }
    return res.status(200).json(orders)
  })
}

exports.updateOrder = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
}

exports.getOrderStatus = (req, res) => {
  Order.updateOne(
    {_id: req.body.orderId},
    {$set: {status: req.body.status}},
    (err, order) => {
      if(err){
        res.status(400).json({
          error:"Cannot update order status"
        })
      }
      return res.json(order);
    }
  )
}