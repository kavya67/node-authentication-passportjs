const express = require("express");
const router = express.Router();

const passport = require("passport");

const userController = require("../controllers/UserController");

router.get(
  "/google-authenticate",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  userController.callback
);

module.exports = router;
