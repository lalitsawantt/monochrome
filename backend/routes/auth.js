const express = require('express');
const { check } = require('express-validator');
const { signout, signup } = require('../controllers/auth');
const router = express.Router();

router.post("/signup", 
check('name','Name must be atleast 2 characters long').isLength({min:2}),
check('email','Valid E-mail required').isEmail(),
check('password','Password should be atleast 5 characters').isLength({min:5})
,signup);
router.get("/signout", signout);

module.exports = router;