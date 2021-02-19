const express = require("express");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const checkPermission = require("../middleware/check-permission");
const extractFile = require("../middleware/multer-file");

const CatalogController = require("../controllers/catalog");

router.get("", CatalogController.getCatalog);

router.post(
  "",
  checkAuth,
  checkPermission,
  extractFile,
  CatalogController.createElement
);

router.put(
  "/:id",
  checkAuth,
  checkPermission,
  extractFile,
  CatalogController.updateElement
);

router.delete(
  "/:id",
  checkAuth,
  checkPermission,
  CatalogController.deleteElement
);

module.exports = router;
