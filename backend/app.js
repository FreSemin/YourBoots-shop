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
  const catalog = {
    catalogElements: [
      {
        title: "title 1",
        img: "card_1.jpg",
        beforePriceNumber: 120,
        currentPriceNumber: 60,
        priceCurrency: "BR",
        sizes: [41, 42, 43, 44],
        count: 1,
      },
      {
        title: "title 2",
        img: "card_1.jpg",
        beforePriceNumber: 120,
        currentPriceNumber: 61,
        priceCurrency: "BR",
        sizes: [41, 42, 43, 44],
        count: 1,
      },
      {
        title: "title 3",
        img: "card_1.jpg",
        currentPriceNumber: 61,
        priceCurrency: "BR",
        sizes: [41, 42, 43, 44],
        count: 1,
      },
    ],
  };
  res.status(200).send(catalog);
});

module.exports = app;
