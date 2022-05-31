const express = require("express");
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")
const {getCategoryById, createCategory, getAllCategories, getCategory, updateCategory, removeCategory} = require("../controllers/category")

// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById)

// routes
router.get("/category/:categoryId", getCategory);
router.get("/categories/", getAllCategories);
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);
module.exports = router;