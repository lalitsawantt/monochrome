const { body, validationResult } = require('express-validator');
const User = require("../models/user");
const jwt = require('jsonwebtoken');
// const expressJwt = require("express-jwt");
const {expressjwt} = require("express-jwt");


exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "You have signed out succesfully",
    status:200
  })
}

exports.signin = (req, res) => {
  const {email, password} = req.body;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({
      err: errors.array()[0].msg,
      param: errors.array()[0].param
    })
  }

  User.findOne({email}, (err, user) => {
    if(err){
      return res.status(400).json({
        error: "User does not exist"
      })
    }
    if(!user){
      return res.status(400).json({
        error:"No user found"
      })
    }
    if(!user.authenticate(password)){
      return res.status(401).json({
        error:"Email and password do not match"
      })
    }
    // CREATING TOKEN & ADDING TO THE COOKIES
    const token = jwt.sign({_id:user._id,}, process.env.SECRET);
    res.cookie("token",token, {expire: new Date() + 9999});
    const {_id, name, email, role} = user;
    res.status(200).json({
      token,
      user:{
        _id, name, email, role
      }
    })
  })
}

exports.signup = (req, res) => {
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const error = {
        err: errors.array()[0].msg,
        param: errors.array()[0].param
      }
      res.status(400).json({
        error: error
      })
    }
  }catch(e){
    res.status(500).json({
      error: e
    })
  }
  // Creating the user
  const user = new User(req.body);
  try{
    user.save((err, usr) => {
      if(err){
        let errs = err.toString().substring(18,24);
        if(errs === "E11000"){
          res.status(400).json({
            err: "This email id already exists"
          })
        }else{
          res.status(400).json({
            err: "NOT able to save user to the database"
          })
        }
      }
      console.log("USER CREATED : ", usr, " : : :err : ", err );
      res.status(200).json({
        name:usr.name,
        email:usr.email,
        id:usr._id    
      });
    });
  }catch(e){
    console.log("Something went wrong : ", e);
  }
}

// Protected routes
exports.isSignedIn = expressjwt({
  secret:process.env.SECRET,
  userProperty:"auth",
  algorithms: ["HS256"]
})


// custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if(!checker){
    return res.status(403).json({
      error:"Access denied"
    })
  }
  next();
}

exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0){
    res.status(403).json({
      error:"Admin access denied"
    })
  }
  next();
}