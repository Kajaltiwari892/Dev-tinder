const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors")

// we have applied here middle ware  taki wo hrr route ke liye json data ko js object mei convert krke body mei push rke uske liye express json bnaya h .
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("http://localhost:7777/");
    });
  })
  .catch((err) => {
    console.log("Database is not  connected " + err.message);
  });

//first of all connect databse , then do app.listen.

// always do like this order.

// whenever you are saving the data , getting the data , etc . then it returns a promise , and we have to use asycn await.
