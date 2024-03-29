const jwt = require("jsonwebtoken");
const secretFile = require("../secrets/secrets");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secretFile.jwtSecretStr);
    req.userPermission = { permission: decodedToken.userPermission };
    next();
  } catch (err) {
    res.status(401).json({
      message: "Auth failed!",
    });
  }
};
