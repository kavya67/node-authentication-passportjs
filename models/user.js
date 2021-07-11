const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  tokens: [
    {
      token: String,
      CreatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew) {
    bcryptjs.genSalt(10).then(function (salt) {
      bcryptjs.hash(user.password, salt).then(function (encryptedPassword) {
        user.password = encryptedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcryptjs.compare(password, user.password);
  return compare;
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const tokenData = {
    _id: user._id,
    userName: user.userName,
    createdAt: Number(new Date())
  }

  const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY);
  user.tokens.push({ token });

  return user
    .save()
    .then(function (user) {
      return Promise.resolve(user);
    })
    .catch(function (err) {
      Promise.reject(err);
    });

};

module.exports = mongoose.model("User", userSchema);
