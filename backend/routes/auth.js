const express = require('express');
const { check } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');
const router = express.Router();

router.post("/signup", 
check('name','Name must be atleast 2 characters long').isLength({min:2}),
check('email','Valid E-mail required').isEmail(),
check('password','Password should be atleast 5 characters').isLength({min:5})
,signup);

router.post("/signin", 
check('email','Valid E-mail required').isEmail(),
check('password','Password is required').isLength({min:5})
,signin);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req,res) => {
  console.log("request.auth ", req.auth);
  if(!req.auth){
    res.status(400).json({
      error: "User is not authenticated"
    })
  }else{
    res.send("A protected route")
  }
})

module.exports = router;