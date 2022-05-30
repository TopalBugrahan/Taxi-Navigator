const express = require("express");
const PageController=require('../controller/PageController')
const UserController=require("../controller/UserController")


const router = express.Router()

router.route("/").get(UserController.getDashBoard)
router.route("/get_map").post(UserController.get_map)
router.route("/get_map1").post(UserController.get_map1)


module.exports =router