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
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// get user by email , hamlog wo emailid ke person ko nikale jiska email id request mei bheja h 
// app.get("/user",async (req,res)=>{
//   const userEmail = req.body.emailId;
// try{
//   // here diff btw find & findOne return array and can find all the related users , but findOne() return only one user.
// const user =  await User.find({emailId : userEmail})
// if(user.length === 0){
//   res.send(404).send("user not found");
// }
// else{
//   res.send(user);
// }
// }catch(err){
//  res.status(400).send("Something went wrong...!")
// }
// })

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


app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// delete the user

app.delete("/user", async (req, res) => {
  const userId = req.body.userId
  try {
    const user = await User.findByIdAndDelete(userId)
    res.send("user deleted")
  } catch (err) {
    res.send("something went wrong , user not deleted")
  }
})

// edit the user

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;


  try {


    const ALLOWED_UPDATES = ["userId",
      "photoUrl", "about", "gender", "age", "skills"]
    const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k))
    if (!isUpdateAllowed) {
      res.status(400).send("update not allowed")
    }

if(data?.skills.length >10){
  throw new Error("SKills cannot be more than 10")
}

    // Basic validation: ensure userId is provided
    if (!userId) {
      return res.status(400).send("userId is required for updating");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Update failed: " + error.message);
  }
});

// feed API - Get /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong...!")
  }
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
