const express = require("express")
const userControllers = require("../controllers/user")
const authorization = require("../utilities")
const router = express.Router()

router.post("/signup",userControllers.postSignUp)
router.post("/login",userControllers.postLogin)
router.get("/get-user",authorization.authorize,userControllers.getUser)

module.exports = router