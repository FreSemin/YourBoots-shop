const express = require("express");

const multer = require("multer");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const checkPermission = require("../middleware/check-permission");

const CatalogController = require("../controllers/catalog");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValidType = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");

    if (isValidType) {
      error = null;
    }

    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.get("", CatalogController.getCatalog);

router.post(
  "",
  checkAuth,
  checkPermission,
  multer({ storage: fileStorage }).single("img"),
  CatalogController.createElement
);

router.put(
  "/:id",
  checkAuth,
  checkPermission,
  multer({ storage: fileStorage }).single("img"),
  CatalogController.updateElement
);

router.delete(
  "/:id",
  checkAuth,
  checkPermission,
  CatalogController.deleteElement
);

module.exports = router;
