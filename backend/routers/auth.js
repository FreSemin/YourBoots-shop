const express = require("express");

const AuthController = require("../controllers/auth");

const router = express.Router();

router.get("/permission/:email", AuthController.getUserPermission);

router.post("/user/signup", AuthController.userSignup);

router.post("/user/login", AuthController.userLogin);

module.exports = router;
