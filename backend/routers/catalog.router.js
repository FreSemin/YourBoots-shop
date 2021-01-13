const express = require("express");

const multer = require("multer");

const router = express.Router();

const CatalogElement = require("../models/catalogElement");

const checkAuth = require("../middleware/check-auth");

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

router.get("", (req, res, next) => {
  CatalogElement.find().then((documents) => {
    res.status(200).send(documents);
  });
});

router.post(
  "",
  checkAuth,
  multer({ storage: fileStorage }).single("img"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const catalogElement = new CatalogElement({
      title: req.body.title,
      img: url + "/images/" + req.file.filename,
      priceCurrency: req.body.priceCurrency,
      beforePriceNumber: req.body.beforePriceNumber,
      currentPriceNumber: req.body.currentPriceNumber,
      sizes: req.body.sizes.split(","),
      count: req.body.count,
    });
    catalogElement.save();
    res.status(201);
  }
);

router.put(
  "/:id",
  checkAuth,
  multer({ storage: fileStorage }).single("img"),
  async (req, res, next) => {
    let imgPath = req.body.img;
    let elementSizes = req.body.sizes;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imgPath = url + "/images/" + req.file.filename;
      elementSizes = req.body.sizes.split(",");
    }
    const updatedCatalogElement = new CatalogElement({
      _id: req.body.id, // fix problem with immutable field
      title: req.body.title,
      img: imgPath,
      priceCurrency: req.body.priceCurrency,
      beforePriceNumber: req.body.beforePriceNumber,
      currentPriceNumber: req.body.currentPriceNumber,
      sizes: elementSizes,
      count: req.body.count,
    });

    await CatalogElement.updateOne(
      { _id: req.params.id },
      updatedCatalogElement
    ).then(() => {
      res.status(200);
    });
  }
);

router.delete("/:id", checkAuth, async (req, res, next) => {
  await CatalogElement.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200);
  });
});

module.exports = router;
