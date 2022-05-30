const mongoose = require("mongoose");
const crypto = require("node:crypto");
const { v4: uuidv4, v4 } = require('uuid');

const schema = mongoose.Schema;

const userSchema = new schema({
  name:{
    type: String,
    required: true,
    maxlength: 32,
    trim: true
  },
  lastname:{
    type:String,
    required:false,
    maxlength:32,
    trim:true,
  },
  email:{
    type:String,
    trim:true,
    required:true,
    unique:true,

  },
  userInfo:{
    type:String,
    trim:true
  },
  encry_password:{
    type:String,
    required:true,

  },
  salt:String,
  role:{
    // Higher the number, higher the  account privilege
    type:Number,
    default:0
  },
  purchases:{
    type:Array,
    default:[]
  }
},{timestamps:true})


userSchema.virtual("password")
          .set(function(password){
            this._password = password;
            this.salt = uuidv4();
            this.encry_password = this.securePassword(password);

          })
          .get(function(){
            return this._password;
          })

userSchema.methods = {

  authenticate:function(plainpassword){
    return this.securePassword(plainpassword) === this.encry_password
  },
  securePassword: function(plainpassword){
    if(!plainpassword) return "";
    try{
      return crypto.createHmac('sha256', this.salt).update(plainpassword).digest('hex');
    }catch(err){
      return "Something went wrong with encrypting password";
    }
  }
}

module.exports = mongoose.model("User",userSchema);