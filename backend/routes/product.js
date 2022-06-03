const express = require("express");
const router = express.Router();
const { check } = require('express-validator');

const {getProductById, getAllProducts, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllCategories} = require("../controllers/product");
const {getUserById} = require("../controllers/user")
const {isAdmin, isAuthenticated, isSignedIn} = require("../controllers/auth")
// const {} = require("../controllers/")

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

// Routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, 
check('name','Name should not be empty').isLength({min:2}),
check('dimension','Dimension should not be empty').isLength({min:3}),
check('price','Price should be a non empty number').isNumeric(),
check('category','category should not be empty').isLength({min:2}),
check('stock','stock should be a non empty number').isNumeric(),
check('description','description should not be empty').isLength({min:5}),
createProduct)

// getting the product, the second route will only be executed to fetch the photo
// This improves performance as images are heavier to fetch
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// Update route
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

// Delete route
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);


// Listing routes
router.get("/products", getAllProducts);
router.get("/products/categories", getAllCategories)

module.exports = router;