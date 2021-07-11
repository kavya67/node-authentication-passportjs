const express = require("express");
const router = express.Router();
const isAuth = require("../auth").isAuth;

const userController = require("../controllers/UserController");

router.post("/signup", userController.postSignUp);
router.post("/login", userController.postLogin);
router.get("/profile", isAuth, userController.getProfile);
router.delete("/logout", isAuth, userController.deleleLogout)

module.exports = router;
