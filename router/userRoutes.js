const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAuth = require("../middleware/authorization").isAuth;

const userController = require("../controllers/UserController");

router.post("/signup", userController.signup);
router.post("/login", passport.authenticate("local"), userController.login);
router.get("/auth", isAuth, userController.authRoute);
router.delete("/logout", userController.logout);

module.exports = router;
