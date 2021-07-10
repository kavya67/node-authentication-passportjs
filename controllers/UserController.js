const User = require("../models/user");

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.userName;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      const newUser = new User({
        email: email,
        password: password,
        userName: userName,
      });
      return newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.json({ error: err }));
    }
    return res.json({ msg: "user already exits" });
  });
};

exports.login = function (req, res, next) {
  res.json({ message: "logged in successfully" });
};

exports.logout = function (req, res, next) {
  req.logout();
  res.redirect("/signup");
};

exports.authRoute = function(req, res, next){
  res.json({message: "you made it!"})
}
