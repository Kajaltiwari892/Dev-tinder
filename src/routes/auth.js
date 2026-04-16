const express = require('express');
const { validateSignupData } = require("../utils/validation")
const User = require("../models/user")
const bcrypt = require("bcrypt")


const authRouter = express.Router();

authRouter.get('/', (req,res)=>{
    res.send("Auth router is working  yeeeyyyy")
})

authRouter.post("/signup", async (req, res) => {
 
  try {
    // validation of  data
    validateSignupData(req)

    const { firstName, lastName, emailId, password } = req.body

    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10)

    // Creating a new instance of the user model  
    const user = new User({
      firstName, lastName, emailId, password: passwordHash
    });

    // console.log(passwordHash)
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// Login api
authRouter.post("/login", async (req, res) => {
  try {

    const { emailId, password } = req.body
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid crendentials")
    }
    // here passowrd is coming from users request and user.password is we are checking from db, that is is creect or not
    const isPasswordValid = await user.validatePassword(password)
    if (isPasswordValid) {

      // 1.create jwt token
      const token = await user.getJWT()
      // 2. add token to cookie  and send response to user
      res.cookie("token", token ,{expires: new Date(Date.now() + 8*3600000)})

      res.send("user login successful")
    } else {
      throw new Error("Invalid crendentials")
    }

  }
  catch (err) {
    res.status(400).send("Error" + err.message)
  }

})

module.exports = authRouter;
