const jwt = require("jsonwebtoken");
const secretFile = require("../../secrets/secrets");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secretFile.jwtSecretStr);
  } catch (err) {
    res.status(401).json({
      message: "Auth failed!",
    });
  }
};
