const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kajalkumari55567w_db_user:ePM291ZlVJZzvh5G@nodejs.nsojmbe.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
