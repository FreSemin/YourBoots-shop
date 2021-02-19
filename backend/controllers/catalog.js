const CatalogElement = require("../models/catalogElement");

exports.getCatalog = (req, res, next) => {
  CatalogElement.find().then((documents) => {
    res.status(200).send(documents);
  });
};

exports.createElement = (req, res, next) => {
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
};

exports.updateElement = async (req, res, next) => {
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
};

exports.deleteElement = async (req, res, next) => {
  await CatalogElement.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200);
  });
};
