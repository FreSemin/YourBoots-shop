const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const allowCors = require("./cors");

const catalogRoutes = require("./routers/catalog");
const authRoutes = require("./routers/auth");

const mongoose = require("mongoose");
const secretsFile = require("../secrets/secrets");

const app = express();

mongoose
  .connect(
    // process.env.MONGO_CONNECT_STR,  // just example for study
    `${secretsFile.mongoDBConnectStr}`, // place in "secrets" folder
    {
      useNewUrlParser: true,
      useCreateIndex: true,
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
app.use("/images", express.static(path.join("backend/images")));

// ctlg - catalog
// short link because don't work with long url: path + id
app.use("/api/ctlg", catalogRoutes);

app.use("/api/auth", authRoutes);

module.exports = app;
