const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
    minLength:3,
    maxLength:30,

  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address:" + value)
      }
    }
    
  },
  age:{
type:Number,
min:18,

  },
  gender:{
type:String,
enum:{
  values:["male","female","others"],
  message:`{VALUE} is incorrect gender type`
  },
//   validate(value){
//   if(!["male","female","others"].includes(value)){
//     throw new Error("gender data is not valid")
//   }
},
  password:{
    type:String,
    required:true,
    validate(value){
  if(!validator.isStrongPassword(value)){
    throw new Error("Password is not strong")
  }
} 
  } ,
  photoUrl:{
    type:String,
    default:"https://thumbs.dreamstime.com/b/fashionable-female-dummy-1424069.jpg",
    validate(value){
  if(!validator.isURL(value)){
    throw new Error("Invalid URL")
  }
}
  },
  about:{
    type:String,
    default:"This is a default about of the user"
  },
  skills:{
    type:[String],
  },
    
  
}
,{
  timestamps:true
}
);

// here always use old function not arrow function
userSchema.methods.getJWT =async function(){
  // this is the user who is calling this function
const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$789",{expiresIn:"1d"})

  return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid =  await bcrypt.compare(passwordInputByUser, passwordHash)

  return isPasswordValid;
}

// always model name starts with captial letter
module.exports = mongoose.model("User", userSchema);