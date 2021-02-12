const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretsFile = require("../../secrets/secrets");

const User = require("../models/user");

const router = express.Router();

router.get("/permission/:email", (req, res, next) => {
  User.findOne({ email: req.params.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "Email not found",
        });
      }
      return res.status(200).json({
        permission: user.permission,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        message: "Email not found",
      });
    });
});

router.post("/user/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hashPassword) => {
    const newUser = new User({
      email: req.body.email,
      password: hashPassword,
    });
    newUser
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created",
          result: result,
        });
      })
      .catch((err) => {
        const response = {
          error: err,
          errorMessage: "",
        };

        if (err.errors.email.name === "ValidatorError") {
          response.errorMessage = "Email is already take!";
        }

        res.status(500).json(response);
      });
  });
});

router.post("/user/login", (req, res, next) => {
  let fetchedUser = null;

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth faild",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth faild",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userPermission: fetchedUser.permission },
        secretsFile.jwtSecretStr,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userPermission: fetchedUser.permission,
        userEmail: fetchedUser.email,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth faild",
      });
    });
});

module.exports = router;
