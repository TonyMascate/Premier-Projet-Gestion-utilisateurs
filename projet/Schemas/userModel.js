const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Tokens: {
    type: Array,
  },
});

userModel.methods.generateTokens = async function (primary, refreshed) {
  this.Tokens = [{ primary }, { refreshed }];
  await this.save();
};

module.exports = mongoose.model("Users", userModel);
