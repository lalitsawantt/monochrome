const { body, validationResult } = require('express-validator');
const User = require("../models/user");

exports.signout = (req, res) => {
  res.json({
    message: "You have signed out succesfully",
    status:200
  })
}

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({
      err: errors.array()[0].msg,
      param: errors.array()[0].param
    })
  }
  const user = new User(req.body);
  try{
    user.save((err, user) => {
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
      res.json({
        name:user.name,
        email:user.email,
        id:user._id    
      });
    });
  }catch(e){
    console.log("Something went wrong : ", e);
  }


}