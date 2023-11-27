const PERMISSION_MAP = {
  admin: "admin",
  moderator: "moderator",
  user: "user",
};

module.exports = (req, res, next) => {
  if (req.userPermission.permission !== PERMISSION_MAP.admin) {
    return res.status(406).json({
      message: "No Permission!",
    });
  }

  next();
};
