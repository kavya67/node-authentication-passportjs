const passport = require("passport");
const bcryptjs = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

const authFields = {
  usernameField: "email",
  passwordField: "password",
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  "local",
  new LocalStrategy(authFields, function (email, password, done) {
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        bcryptjs
          .compare(password, user.password)
          .then((isValid) => {
            if (isValid) {
              return done(null, user);
            }
            return done(null, false, {
              message: "Invalid username / password!",
            });
          })
          .catch((error) => done(null, false));
      })
      .catch((err) => {
        done(err);
      });
  })
);
