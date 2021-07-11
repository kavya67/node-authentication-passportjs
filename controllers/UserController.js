const User = require("../models/user");
const passport = require("passport");

exports.postSignUp = (req, res, next) => {
  const { email, password, userName } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const newUser = new User({
          email,
          password,
          userName,
        });
        return newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => res.json({ error: err }));
      }
      return res.json({ msg: "user already exits" });
    })
    .catch((err) => res.json({ error: err }));
};

exports.postLogin = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    try {
      if (err || !user) {
        return res.json(info);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        user
          .generateToken()
          .then((user) => res.json(user))
          .catch((error) => res.json(error));
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

exports.getProfile = (req, res, next) => {
  res.json(req.user);
};

exports.deleleLogout = (req, res, next) => {
  passport.authenticate("logout", (err, user, info) => {
    try {
      if (err || !user) {
        return res.json(info);
      }
      req.logout();
      return res.json(info);
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
