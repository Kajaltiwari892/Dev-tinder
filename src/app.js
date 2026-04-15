const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("../utils/validation")
const bcrypt = require("bcrypt")
const validator = require("validator")
const cookieParser = require("cookie-parser")
const jwt = require('jsonwebtoken')
const {userAuth} = require("./middleware/auth")

// we have applied here middle ware  taki wo hrr route ke liye json data ko js object mei convert krke body mei push rke uske liye express json bnaya h .
app.use(express.json());
app.use(cookieParser())

app.post("/signup", async (req, res) => {
 
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

    console.log(passwordHash)
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});


app.post("/", async (req, res) => {
  // Creating a new instance of the user model  
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error");
  }
});


// Login api
app.post("/login", async (req, res) => {
  try {

    const { emailId, password } = req.body
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid crendentials")
    }
    // here passowrd is coming from users request and user.password is we are checking from db, that is is creect or not
    const isPasswordValid = user.validatePassword(password)
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

// profile get
app.get("/profile", userAuth,async (req, res) => {

  try {
    const user = req.user
    res.send(user)
 
  }
  catch(err) {
    res.status(400).send("Error" + err.message)
  }
})

app.post("/sendConnectionRequest",userAuth, async (req,res) =>{

  const user = req.user;


  // Sending a connection request
  console.log("Sending a connection request");

  res.send(user.firstName + " sent a connection request");
})


connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("http://localhost:3000/");
    });
  })
  .catch((err) => {
    console.log("Database is not  connected");
  });

//first of all connect databse , then do app.listen.

// always do like this order.

// whenever you are saving the data , getting the data , etc . then it returns a promise , and we have to use asycn await.
