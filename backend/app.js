const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const allowCors = require("./cors");

const catalogRoutes = require("./routers/catalog.router");

const mongoose = require("mongoose");
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
app.use("/imgs", express.static(path.join("backend/imgs")));

// ctlg - catalog
// short link because don't work with long url: path + id
app.use("/api/ctlg", catalogRoutes);

module.exports = app;
