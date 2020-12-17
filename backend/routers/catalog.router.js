const express = require("express");

const router = express.Router();

const CatalogElement = require("../models/catalogElement");

router.get("", (req, res, next) => {
  CatalogElement.find().then((documents) => {
    res.status(200).send(documents);
  });
});

router.post("", (req, res, next) => {
  const catalogElement = new CatalogElement({
    title: req.body.title,
    img: req.body.img,
    priceCurrency: req.body.priceCurrency,
    beforePriceNumber: req.body.beforePriceNumber,
    currentPriceNumber: req.body.currentPriceNumber,
    sizes: req.body.sizes,
    count: req.body.count,
  });
  catalogElement.save();
  res.status(201);
});

router.put("/:id", async (req, res, next) => {
  const updatedCatalogElement = new CatalogElement({
    _id: req.body.id, // fix problem with immutable field
    title: req.body.title,
    img: req.body.img,
    priceCurrency: req.body.priceCurrency,
    beforePriceNumber: req.body.beforePriceNumber,
    currentPriceNumber: req.body.currentPriceNumber,
    sizes: req.body.sizes,
    count: req.body.count,
  });

  await CatalogElement.updateOne(
    { _id: req.params.id },
    updatedCatalogElement
  ).then(() => {
    res.status(200);
  });
});

router.delete("/:id", async (req, res, next) => {
  await CatalogElement.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200);
  });
});

module.exports = router;
