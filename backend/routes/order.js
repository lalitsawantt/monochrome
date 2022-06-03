const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { updateStock } = require("../controllers/product");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const {getOrderById, createOrder, getAllOrders, updateOrder, getOrderStatus} = require("../controllers/order");
const router = express.Router();

// Params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Routes
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);
router.get("/orders/:userId", isSignedIn, isAuthenticated, getAllOrders);
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateOrder);


module.exports = router;