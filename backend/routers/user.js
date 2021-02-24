const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

router.get("/permission/:email", UserController.getUserPermission);

router.post("/user/signup", UserController.userSignup);

router.post("/user/login", UserController.userLogin);

module.exports = router;
