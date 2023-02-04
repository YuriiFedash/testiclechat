const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  nickname: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
