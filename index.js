const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
//passport
const passport = require("passport");

//dotenv
require("dotenv").config();

//passport setup
require("./config/passport-local");


//general setup

const app = express();
const url = process.env.DB_URL_LOCAL_HOST;
const port = process.env.PORT || 3003;

app.use(express.static("public"));
app.use(
  session({
    secret: "test@124",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: url,
      collection: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//router
const userRouter = require("./router/userRoutes");

app.use(passport.initialize());
app.use(passport.session());

app.use(userRouter);


//db connection

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
