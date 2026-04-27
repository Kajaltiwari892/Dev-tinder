const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

// get all the pending connection request for the logged in user
userRouter.get("/user/requests", userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
           toUserId : loggedInUser._id,
           status:"interested"
        })
        re.json({message: "Data fetched successfully" , data:connectionRequests})
        
    } catch (error) {
        res.status(400).send("Error" + error.message)
    }
})




module.exports = userRouter;
