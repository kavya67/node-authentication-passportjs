const passport = require("passport");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const { validate } = require("../models/user");

const options = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const strategyJWT = new JwtStrategy(options, (payload, done) => {
  User.findOne({ _id: payload._id })
    .then((user) => {
      console.log("inside jwt");
      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "user not found!" });
      }
    })
    .catch((err) => done(err));
});

const logout = new JwtStrategy(options, (payload, done) => {
  User.findOneAndDelete({ _id: payload._id })
    .then((user) => done(null, user, { message: "logged out!" }))
    .catch((err) => done(null, false, { message: err }));
});

const authFields = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const strategyLocal = new LocalStrategy(authFields, function (
  req,
  email,
  password,
  done
) {
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: "Invalid user!" });
      }
      user
        .isValidPassword(password)
        .then((validate) => {
          if (!validate) {
            done(null, false, { message: "Invalid password!" });
          }
          done(null, user, { message: "logged in successfully!" });
        })
        .catch((err) => done(err));
    })
    .catch((error) => done(error));
});

passport.use("jwt", strategyJWT);
passport.use("local", strategyLocal);
passport.use("logout", logout);
