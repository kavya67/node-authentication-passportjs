const express = require("express");
const mongoose = require("mongoose");

//dotenv
require("dotenv").config();

//passport
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const app = express();
const url = process.env.DB_URL_LOCAL_HOST;
const port = process.env.PORT || 3003;

//router
const userRouter = require("./router/userRoutes");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL: "http://localhost:3006/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log("profile", profile)
      User.findOrCreate({ googleId: profile.id }, done);
    }
  )
);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(googleStrategy);
app.use(passport.initialize());

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
