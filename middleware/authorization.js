module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401).json({ msg: "your not authorised to visit this page" });
  }
};

module.exports.isAdmin = (req, res, next) => {};
