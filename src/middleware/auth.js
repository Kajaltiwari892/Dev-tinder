const jwt = require("jsonwebtoken");
const User = require("../models/user");


 const userAuth = async (req, res, next) => {
  //  Read the token from the req cookies

  try{const {token} = req.cookies

  // validate the token 
  const decodedObj = await jwt.verify(token, "DEV@Tinder$789")


  const {_id} = decodedObj;
  
  // find the user

  const user = await User.findById(
    _id
  )
  if(!user){
    throw new Error("user not found")
  }
  req.user = user
 next()}
 catch(err){
  res.status(400).send("Error"+err.message)
 }
  
 };


module.exports = { userAuth
}