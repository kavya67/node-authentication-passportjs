const passport = require("passport");

exports.isAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(401).send("not authorised!");
      }
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
