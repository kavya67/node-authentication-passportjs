const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});

userSchema.statics.findOrCreate = function(googleid){
  const User = this;
  User.findOne({oauthId}).then(user => {
    if(!user)
  })
}

module.exports = mongoose.model("User", userSchema);
