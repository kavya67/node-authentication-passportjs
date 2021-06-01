const express = require("express");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

const url = process.env.DB_URL_LOCAL_HOST;
const port = process.env.PORT || 3003;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to db");
    app.listen(port, () => console.log("listening to the port", port));
  })
  .catch((err) => console.log("error connecting to db", err));
