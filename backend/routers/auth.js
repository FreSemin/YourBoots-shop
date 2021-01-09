const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretsFile = require("../../secrets/secrets");

const User = require("../models/user");

const router = express.Router();

router.post("/admin/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hashPassword) => {
    const admin = new User({
      email: req.body.email,
      password: hashPassword,
      access: "admin",
    });
    admin
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Admin created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/admin/login", (req, res, next) => {
  let fetchedAdmin = null;

  // find Admin
  User.findOne({ email: req.body.email })
    .then((admin) => {
      if (!admin) {
        return res.status(401).json({
          message: "Auth faild",
        });
      }
      fetchedAdmin = admin;
      return bcrypt.compare(req.body.password, admin.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth faild",
        });
      }
      const token = jwt.sign(
        { email: fetchedAdmin.email, userId: fetchedAdmin._id },
        secretsFile.jwtSecretStr,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth faild",
      });
    });
});

module.exports = router;
