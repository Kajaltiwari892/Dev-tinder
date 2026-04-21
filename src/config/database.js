const mongoose = require("mongoose");

const connectDB = async () => {
  // Using direct connection to bypass SRV DNS issue on Node.js v24
  await mongoose.connect(
    "mongodb://kajalkumari55567w_db_user:ePM291ZlVJZzvh5G@ac-d8ungkw-shard-00-00.nsojmbe.mongodb.net:27017,ac-d8ungkw-shard-00-01.nsojmbe.mongodb.net:27017,ac-d8ungkw-shard-00-02.nsojmbe.mongodb.net:27017/devTinder?ssl=true&authSource=admin",
    {
      serverSelectionTimeoutMS: 10000,
    }
  );
};

module.exports = connectDB;
