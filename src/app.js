const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// we have applied here middle ware  taki wo hrr route ke liye json data ko js object mei convert krke body mei push rke uske liye express json bnaya h .
app.use(express.json());
app.post("/signup", async (req, res) => {
  // Creating a new instance of the user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error");
  }
});

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
