const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const router = express.Router();

router.post("/admin/signup", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashPassword) => {
      const admin = new User({
        email: req.body.email,
        password: hashPassword,
        access: "admin",
      });
      admin.save().then((result) => {
        res.status(201).json({
          message: "Admin created",
          result: result,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
