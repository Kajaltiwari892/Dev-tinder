const express = require('express');
const { userAuth } = require("../middleware/auth")
const { validateProfileEditData } = require("../utils/validation")


const profileRouter = express.Router();

// profile view
profileRouter.get("/profile/view", userAuth, async (req, res) => {

    try {
        const user = req.user
        res.send(user)

    }
    catch (err) {
        res.status(400).send("Error" + err.message)
    }
})

// profile Edit 

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateProfileEditData(req))
            return res.status(400).send("Invalid fields")

        const loggedInUser = req.user;
        console.log(loggedInUser);

    } catch (error) {
        res.status(400).send("Error" + error.message)
    }
})

module.exports = profileRouter;
