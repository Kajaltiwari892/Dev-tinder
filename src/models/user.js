const mongoose = require("mongoose");
const validator = require("validator");

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
validate(value){
  if(!["male","female","others"].includes(value)){
    throw new Error("gender data is not valid")
  }
}
  },
  password:{
    type:String,
    required:true
  } ,
  photoUrl:{
    type:String,
    default:"https://thumbs.dreamstime.com/b/fashionable-female-dummy-1424069.jpg"
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

// always model name starts with captial letter
module.exports = mongoose.model("User", userSchema);
