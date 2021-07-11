const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

//dotenv
require("dotenv").config();
//passport setup
require("./config/passport")
//general setup
const app = express();
const url = process.env.DB_URL_LOCAL_HOST;
const port = process.env.PORT || 3003;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

//router
const userRouter = require("./router/userRoutes");

app.use(userRouter);

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
