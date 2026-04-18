const express = require('express');
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require('../models/connectionRequest');
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {

  try {
    const fromUserId = req.user._id
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    // check if the status is valid
    const allowedStatus = ["interested", "ignored"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Invalid status" + status});
    }
    
    //  if there is an existing connection request

    const existingConnectionRequest = await ConnectionRequest.findOne(
      {
        $or:[
          {

            fromUserId: fromUserId,
            toUserId: toUserId,
          }
        ],
      }
    );

    
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
})


module.exports = requestRouter;