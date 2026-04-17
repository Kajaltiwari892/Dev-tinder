const express = require('express');
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require('../models/connectionRequest');
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {

  try {
    const fromUserId = req.user._id
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,

    })

const data = await connectionRequest.save();
res.json({
  message:"Connection send successfully",
  data,
})

  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }

  res.send(user.firstName + " sent a connection request");
})


module.exports = requestRouter;