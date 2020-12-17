const express = require("express");
const bodyParser = require("body-parser");
const allowCors = require("./cors");
const mongoose = require("mongoose");
const CatalogElement = require("./models/catalogElement");
const mongoDBConnect = require("../secrets/secrets");
const app = express();

mongoose
  .connect(
    `${mongoDBConnect}`, // place in "secrets" folder
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connect to database success!");
  })
  .catch((e) => {
    console.log(e);
    console.log("Connect to database faild!");
  });

app.use(allowCors);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/catalog", (req, res, next) => {
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

app.use("/api/catalog", (req, res, next) => {
  CatalogElement.find().then((documents) => {
    res.status(200).send(documents);
  });
});

app.put("/api/ctlg/:id", async (req, res, next) => {
  await CatalogElement.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        img: req.body.img,
        priceCurrency: req.body.priceCurrency,
        beforePriceNumber: req.body.beforePriceNumber,
        currentPriceNumber: req.body.currentPriceNumber,
        sizes: req.body.sizes,
        count: req.body.count,
      },
    }
  ).then(() => {
    res.status(200);
  });
});

// ctlg - catalog
// short link because don't work with long url: name + id
app.delete("/api/ctlg/:id", async (req, res, next) => {
  await CatalogElement.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200);
  });
});

module.exports = app;
