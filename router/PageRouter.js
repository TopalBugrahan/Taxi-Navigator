const express = require("express");
const PageController=require('../controller/PageController')
const UserController=require("../controller/UserController")

const router = express.Router()

router.route("/").get(PageController.getIndex)
router.route("/").post(UserController.loginUser)
router.route("/darkwebkiller").get(PageController.getDarkWebKiller)
router.route("/userOut").get(UserController.userOut)

module.exports =router