const User = require("../models/user");


exports.callback = (req, res, next) =>{
    res.json("successfully logged in!")
}
